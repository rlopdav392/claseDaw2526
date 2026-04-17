import { redirect } from "next/navigation";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { getSession } from "@/lib/auth/session";

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Iniciar sesión
        </h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Accede con tu email y contraseña.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
