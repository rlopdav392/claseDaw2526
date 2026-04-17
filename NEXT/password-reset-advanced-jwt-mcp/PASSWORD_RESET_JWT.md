# Password Reset JWT (Next.js)

## Descripción

Aplicación web en **Next.js** con registro, login, sesión por **JWT en cookie httpOnly**, flujo de **recuperación de contraseña** (email con enlace que lleva un JWT en la URL, no en cookies), validación con **Zod**, persistencia con **Prisma** sobre **PostgreSQL** (p. ej. Supabase), envío de correos vía **Inngest** (con **Resend** y **React Email** como respaldo si falla `inngest.send()`).

La especificación detallada está en [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Funcionalidades

- **Registro**: email, usuario y contraseña (hash con bcrypt).
- **Login**: email y contraseña; redirección a `/dashboard`; enlace a recuperación de contraseña.
- **Forgot password**: email; evento Inngest `app/password.password-reset`; si falla el envío a Inngest, envío directo con Resend.
- **Reset password**: ruta `/reset-password/[token]`; dos campos de contraseña; JWT validado en servidor; nonce en BD para un solo uso lógico; expiración corta del JWT de reset.
- **Usuario autenticado**: `/dashboard` protegida por middleware; saludo; cambio de contraseña con contraseña actual.

## Stack

| Tecnología | Uso |
|------------|-----|
| Next.js 15 (App Router) | UI, Server Actions, middleware |
| Prisma 6 | ORM |
| PostgreSQL (Supabase) | Base de datos |
| jose | JWT (sesión y reset) |
| bcryptjs | Hash de contraseñas |
| Zod | Validación |
| Inngest | Cola / funciones para envío de email de reset |
| Resend + React Email | Envío de correos y plantillas |
| Jest | Tests |
| Tailwind CSS 4 | Estilos |

## Arquitectura

- **Patrón**: Vista → componente de formulario → Server Action (ver `ARCHITECTURE.md`).
- **Sesión**: JWT firmado en cookie `auth_session` (`httpOnly`, `sameSite: 'lax'`, `secure` en producción); validación en middleware para `/dashboard/*` y en `getSession()` donde aplique.
- **Reset**: JWT en la URL (`/reset-password/<token>`); campo `passwordResetNonce` en `User` alineado con el payload del JWT; sin guardar el token de reset en cookies.
- **API Inngest**: `app/api/inngest/route.ts` registra la función que genera el enlace y envía el email.

## Login

- Ruta: `/login`.
- Tras login correcto se establece la cookie de sesión y se redirige a `/dashboard`.

## Registro

- Ruta: `/register`.
- Validación con `registerSchema` (Zod); creación de usuario con Prisma.

## Reset password

1. **Solicitud**: `/forgot-password` → Server Action intenta `inngest.send()`; si falla, `generatePasswordResetLink` + `sendPasswordResetEmail`.
2. **Email**: enlace del tipo `{APP_URL}/reset-password/{token}` (token URL-encoded).
3. **Formulario**: `/reset-password/[token]` → `resetPasswordAction` valida JWT + nonce, actualiza contraseña y limpia `passwordResetNonce`.

## JWT

- **Sesión** (`lib/auth/jwt.ts`): claims `sub`, `email`, `username`; secreto `AUTH_SESSION_SECRET` (≥ 32 caracteres recomendado).
- **Reset** (`lib/password-reset-jwt.ts`): claims `userId`, `nonce`; secreto `PASSWORD_RESET_JWT_SECRET`; TTL 30 minutos; validación adicional con `isResetNonceValid` / `validatePasswordResetToken`.

## Inngest

- Cliente: `lib/inngest.ts`.
- Handler HTTP: `app/api/inngest/route.ts` (GET, POST, PUT).
- Función: `features/password/events/event-password-reset.ts` (trigger `app/password.password-reset`).
- **URL local del endpoint:** `http://localhost:3000/api/inngest` (mismo origen que la app). Un GET correcto devuelve JSON con metadatos (por ejemplo `function_count`, `has_signing_key`).
- **Si ves 404 o “no definido”:** arranca `npm run dev` **desde la carpeta de este repo** (`password-reset-advanced-jwt-mcp`), no desde otro proyecto en el mismo puerto. Comprueba que el proceso que escucha el 3000 es el de este Next.js (`Get-Process` / `netstat` en Windows).

### Solo Inngest Dev (sin cuenta Cloud)

No usarás [app.inngest.com](https://app.inngest.com): los eventos **no** aparecen ahí. El SDK en modo dev envía a **`http://localhost:8288/`** y la interfaz es la del **Inngest Dev Server** en ese puerto.

1. En `.env`, define **`INNGEST_DEV=1`** (no necesitas `INNGEST_EVENT_KEY` ni `INNGEST_SIGNING_KEY` en local).
2. **Dos terminales** en la raíz del proyecto:
   - `npm run dev` (Next en `:3000`)
   - `npm run inngest:dev` (CLI; suele abrir UI en `:8288` y enlazar tu app con `/api/inngest`)

Documentación: [desarrollo local con Inngest](https://www.inngest.com/docs/local-development).

### Inngest Cloud (producción o dashboard en la nube)

1. **`INNGEST_EVENT_KEY` real** — En la app en Inngest → **Manage** → **Keys** (sin placeholders). Sin clave válida en modo cloud, `inngest.send()` falla y se usa **Resend** como respaldo.
2. **No mezclar con dev local** — Quita `INNGEST_DEV` (o pon `INNGEST_DEV=0`) si quieres enviar a Cloud y ver tráfico en **app.inngest.com**.
3. **Consola** — Tras “Recuperar contraseña”, en la terminal de Next debería salir `[forgotPassword] Inngest evento enviado` con `ids`. Si falla antes del fallback, revisa red o claves.

## Resend

- `lib/email.tsx`: envía con `resend.emails.send` y plantilla React en `emails/password/email-password-reset.tsx`.
- Sin `RESEND_API_KEY` el envío no llega a Resend (se registra advertencia en consola).

## React Email

- Plantilla: `emails/password/email-password-reset.tsx` con **`@react-email/components`** (`Html`, `Head`, `Preview`, `Body`, `Container`, `Section`, `Text`, `Button`, `Tailwind`).
- **Vista previa en el navegador (solo desarrollo)**: con `npm run dev`, abre [http://localhost:3000/dev/email-preview](http://localhost:3000/dev/email-preview). Renderiza HTML con `@react-email/render`. En producción la ruta responde 404.

## Estructura del proyecto (principal)

```
app/                    # Rutas App Router (/, login, register, dashboard, forgot-password, reset-password/[token], api/inngest, dev/email-preview)
components/layout/      # Cabecera y pie
features/auth/          # Registro, login, logout, cambio de contraseña
features/password/      # Forgot password, reset, utilidades, evento Inngest
lib/                    # Prisma, auth JWT, reset JWT, email, Inngest, validaciones Zod
emails/                 # Plantillas React Email
prisma/                 # schema.prisma y migraciones
```

## Instalación

```bash
npm install
cp .env.example .env
# Edita .env con tus URLs de Supabase, secretos y claves (Resend). Para Inngest solo-dev: INNGEST_DEV=1.
npx prisma generate
npm run dev
# En otra terminal (opcional, para ver eventos y ejecutar funciones Inngest en local): npm run inngest:dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL (pooler Supabase recomendado para la app) |
| `DIRECT_URL` | Conexión directa para migraciones Prisma |
| `AUTH_SESSION_SECRET` | Firma del JWT de sesión (≥ 32 caracteres) |
| `PASSWORD_RESET_JWT_SECRET` | Firma del JWT de reset (≥ 8 caracteres en código) |
| `APP_URL` | Origen de la app para enlaces en emails (default `http://localhost:3000`) |
| `RESEND_API_KEY` | API key de Resend |
| `RESEND_FROM_EMAIL` | Remitente verificado en Resend |
| `INNGEST_EVENT_KEY` | Event key de Inngest Cloud; en local con `INNGEST_DEV=1` no hace falta |
| `INNGEST_SIGNING_KEY` | Signing key de Cloud para `/api/inngest` en producción; opcional en solo-dev |
| `INNGEST_DEV` | `1` o `true`: modo Dev Server local (`:8288`), sin cuenta Cloud |

Valores de ejemplo sin secretos reales: [`.env.example`](./.env.example).

## Tests

```bash
npm test
npm run test:watch   # opcional
```

Incluye tests de esquemas Zod (registro, login, forgot, reset, cambio de contraseña) y de la lógica de nonce de reset (`lib/password-reset-nonce.test.ts`). Los tests cargan secretos mínimos desde `jest.setup.ts`.

## Autoría

Proyecto de laboratorio **NEXT-LAB** / entorno educativo; implementación asistida por herramientas de IA (Cursor) según `ARCHITECTURE.md`, `AGENTS.md` y agentes en `agents/`.

## Mejoras posibles

- Tests de integración con base de datos de prueba o contenedor.
- Invalidar sesiones al cambiar contraseña (rotación de JWT o lista de sesiones).
- Rate limiting en login y forgot password.
- i18n si se amplía el público.
- Despliegue: fuera del alcance actual (`ARCHITECTURE.md`: solo desarrollo local).
