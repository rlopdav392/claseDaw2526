import { redirect } from "next/navigation";
import { ChangePasswordForm } from "@/features/auth/components/ChangePasswordForm";
import { logoutAction } from "@/features/auth/actions/logout";
import { getSession } from "@/lib/auth/session";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Hola, {session.username}
          </h1>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Sesión iniciada como {session.email}
          </p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            Cerrar sesión
          </button>
        </form>
      </div>

      <section className="border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Cambiar contraseña
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Introduce tu contraseña actual y la nueva dos veces.
        </p>
        <div className="mt-4">
          <ChangePasswordForm />
        </div>
      </section>
    </div>
  );
}
