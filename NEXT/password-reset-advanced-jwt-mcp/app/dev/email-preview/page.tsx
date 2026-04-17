import { notFound } from "next/navigation";
import { render } from "@react-email/render";
import PasswordResetEmail from "@/emails/password/email-password-reset";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Preview — email reset",
  robots: "noindex, nofollow",
};

/**
 * Vista previa HTML del correo (solo `NODE_ENV === "development"`).
 * En producción devuelve 404.
 */
export default async function EmailPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const html = await render(
    <PasswordResetEmail
      toName="Usuario demo"
      url="http://localhost:3000/reset-password/token-ejemplo"
    />,
  );

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <header>
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Vista previa del correo (solo desarrollo)
        </h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Fuente:{" "}
          <code className="font-mono text-xs">
            emails/password/email-password-reset.tsx
          </code>
        </p>
      </header>
      <iframe
        title="Vista previa del correo"
        srcDoc={html}
        className="min-h-[720px] w-full rounded border border-neutral-200 bg-white shadow-sm dark:border-neutral-700"
        sandbox="allow-same-origin"
      />
    </div>
  );
}
