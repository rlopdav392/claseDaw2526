"use client";

import { useActionState } from "react";
import {
  forgotPasswordAction,
  type ForgotPasswordState,
} from "@/features/password/actions/forgot-password";

const initialState: ForgotPasswordState = {};

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    forgotPasswordAction,
    initialState,
  );

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-4">
      <div className="space-y-1">
        <label
          htmlFor="forgot-email"
          className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
        >
          Email
        </label>
        <input
          id="forgot-email"
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

      {state.success ? (
        <p className="text-sm text-green-700 dark:text-green-400" role="status">
          Si existe una cuenta con ese email, recibirás un enlace para
          restablecer la contraseña.
        </p>
      ) : null}

      {state.error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        {pending ? "Enviando…" : "Enviar enlace"}
      </button>
    </form>
  );
}
