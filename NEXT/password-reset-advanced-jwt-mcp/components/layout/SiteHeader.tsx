import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
        >
          Home
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-300"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-300"
          >
            Registro
          </Link>
        </nav>
      </div>
    </header>
  );
}
