"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  resetPasswordAction,
  type ResetPasswordState,
} from "@/features/password/actions/reset-password";

const initialState: ResetPasswordState = {};

type Props = {
  token: string;
};

export function ResetPasswordForm({ token }: Props) {
  const [state, formAction, pending] = useActionState(
    resetPasswordAction,
    initialState,
  );

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-4">
      <input type="hidden" name="token" value={token} />

      <div className="space-y-1">
        <label
          htmlFor="reset-password"
          className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
        >
          Nueva contraseña
        </label>
        <input
          id="reset-password"
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

      <div className="space-y-1">
        <label
          htmlFor="reset-password-confirm"
          className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
        >
          Repetir contraseña
        </label>
        <input
          id="reset-password-confirm"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          required
          disabled={pending}
          aria-invalid={state.fieldErrors?.passwordConfirm ? true : undefined}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none ring-neutral-400 focus:ring-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
        {state.fieldErrors?.passwordConfirm ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {state.fieldErrors.passwordConfirm}
          </p>
        ) : null}
      </div>

      {state.error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <div className="space-y-3 text-sm text-green-700 dark:text-green-400">
          <p role="status">Contraseña actualizada correctamente.</p>
          <p>
            <Link
              href="/login"
              className="font-medium text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
            >
              Ir a iniciar sesión
            </Link>
          </p>
        </div>
      ) : null}

      {!state.success ? (
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          {pending ? "Guardando…" : "Guardar contraseña"}
        </button>
      ) : null}
    </form>
  );
}
