import Link from "next/link";
import { validatePasswordResetToken } from "@/lib/password-reset-server";
import { ResetPasswordForm } from "@/features/password/components/ResetPasswordForm";

type Props = {
  params: Promise<{ token: string }>;
};

export default async function ResetPasswordPage({ params }: Props) {
  const { token } = await params;

  let tokenOk = false;
  try {
    await validatePasswordResetToken(token);
    tokenOk = true;
  } catch {
    tokenOk = false;
  }

  if (!tokenOk) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Enlace no válido
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          El enlace ha caducado, ya se ha usado o no es correcto. Solicita un
          nuevo correo desde{" "}
          <Link
            href="/forgot-password"
            className="font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
          >
            recuperar contraseña
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Nueva contraseña
        </h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Elige una contraseña segura y confírmala.
        </p>
      </div>
      <ResetPasswordForm token={token} />
    </div>
  );
}
