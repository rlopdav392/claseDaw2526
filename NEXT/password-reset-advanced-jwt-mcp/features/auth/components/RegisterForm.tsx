"use client";

import { useActionState } from "react";
import { registerAction, type RegisterState } from "@/features/auth/actions/register";

const initialState: RegisterState = {};

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState,
  );

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-4">
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
        >
          Email
        </label>
        <input
          id="email"
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
          htmlFor="username"
          className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
        >
          Nombre de usuario
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          disabled={pending}
          aria-invalid={state.fieldErrors?.username ? true : undefined}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none ring-neutral-400 focus:ring-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
        {state.fieldErrors?.username ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {state.fieldErrors.username}
          </p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
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

      {state.success ? (
        <p className="text-sm text-green-700 dark:text-green-400" role="status">
          Cuenta creada correctamente. Ya puedes iniciar sesión.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        {pending ? "Registrando…" : "Registrarse"}
      </button>
    </form>
  );
}
