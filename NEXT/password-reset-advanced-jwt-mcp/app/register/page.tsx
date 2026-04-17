import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Registro
        </h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Crea una cuenta con email, nombre de usuario y contraseña.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
