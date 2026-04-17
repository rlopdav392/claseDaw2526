"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type LoginState } from "@/features/auth/actions/login";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-4">
      <div className="space-y-1">
        <label
          htmlFor="login-email"
          className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
        >
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={pending}
          aria-invalid={state.fieldErrors?.email ? true : undefined}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none ring-neutral-400 focus:ring-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
        {state.fieldErrors?.email ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {state.fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="login-password"
          className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
        >
          Contraseña
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
          aria-invalid={state.fieldErrors?.password ? true : undefined}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none ring-neutral-400 focus:ring-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
        {state.fieldErrors?.password ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {state.fieldErrors.password}
          </p>
        ) : null}
      </div>

      {state.error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="flex items-center justify-between text-sm">
        <Link
          href="/forgot-password"
          className="text-neutral-700 underline underline-offset-4 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
        >
          ¿Has olvidado tu contraseña?
        </Link>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        {pending ? "Entrando…" : "Iniciar sesión"}
      </button>
    </form>
  );
}
