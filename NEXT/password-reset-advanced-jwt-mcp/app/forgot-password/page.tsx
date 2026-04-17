import { ForgotPasswordForm } from "@/features/password/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Recuperar contraseña
        </h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Indica tu email. Si hay una cuenta asociada, te enviaremos un enlace
          (vía Inngest; si falla, se intenta envío directo con Resend).
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
