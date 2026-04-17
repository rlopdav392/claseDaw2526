# Proyecto: Password Reset JWT (Next.js)

## Objetivo

Construir una aplicación web en Next.js con autenticación básica y flujo completo de reset de contraseña usando JWT.

---

## Estructura general de la aplicación

### Layout principal

- Header:
  - enlace a Login
  - enlace a Registro

- Main:
  - página principal simple
  - texto: "Página de pruebas para password reset con JWT"

- Footer:
  - vacío

---

## Funcionalidades

### 1. Registro
- crear usuario con email, username y password

### 2. Login
- formulario con email y password
- redirección tras login correcto
- enlace a "Forgot password"

### 3. Forgot Password
- formulario con email
- genera token JWT
- envía email con link de reset usando Inngest
- solo usar fallback si falla Inngest

### 4. Reset Password
- página accesible mediante token
- formulario nueva password (doble campo)
- validación de token
- comprobación de expiración
- actualización de password

### 5. Usuario autenticado
- página protegida
- saludo al usuario
- opción para cambiar password

---

## Librerías obligatorias

- Next.js
- Prisma
- Supabase
- Inngest: npm run inngest:dev
- Resend
- React Email
- Zod
- Jest

---

## Patrón obligatorio

Vista → Componente Form → Server Action

---

## Base de datos (Supabase + Prisma)

Modelo mínimo:

User:
- id
- email
- username
- password
- createdAt
- updatedAt

---

## MCP Server (OBLIGATORIO)

El proyecto DEBE usar el MCP server de Supabase configurado en:

.cursor/mcp.json

Reglas obligatorias:

- El agente debe usar SIEMPRE el MCP para interactuar con la base de datos
- NO debe simular base de datos
- NO debe usar mocks si el MCP está disponible
- NO debe inventar datos

El agente debe:

- crear tablas usando MCP
- insertar datos usando MCP
- consultar datos usando MCP

---

## Backend

- Server Actions
- JWT para reset password
- Inngest como flujo principal

Regla:

- SIEMPRE usar Inngest
- SOLO usar fallback si falla inngest.send()

---

## Testing

Se debe usar Jest.

Cubrir:

- login
- registro
- forgot password
- reset password
- validación de token
- expiración
- edge cases

---

## Alcance

- Sin deploy
- Solo desarrollo local

## Autenticación (OBLIGATORIO)

El sistema debe usar JWT para autenticación.

Reglas obligatorias:

- El token de autenticación (login) debe almacenarse en una cookie httpOnly
- NO se permite usar localStorage ni sessionStorage para autenticación
- La cookie debe configurarse con:
  - httpOnly: true
  - secure: true (en producción)
  - sameSite: "lax" o "strict"
  - path: "/"

- El token debe ser leído en el servidor usando `cookies()` de Next.js
- El token debe validarse en cada request protegida

---

## Reset password JWT

El token de reset password:

- NO debe almacenarse en cookies
- Debe enviarse en la URL
- Debe ser de un solo uso lógico (expiración corta)
- Debe validarse en el servidor antes de permitir el cambio de password