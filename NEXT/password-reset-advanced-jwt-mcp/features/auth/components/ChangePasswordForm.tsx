"use client";

import { useActionState } from "react";
import {
  changePasswordAction,
  type ChangePasswordState,
} from "@/features/auth/actions/change-password";

const initialState: ChangePasswordState = {};

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(
    changePasswordAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <label
          htmlFor="current-password"
          className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
        >
          Contraseña actual
        </label>
        <input
          id="current-password"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
          aria-invalid={state.fieldErrors?.currentPassword ? true : undefined}
          className="w-full max-w-md rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none ring-neutral-400 focus:ring-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
        {state.fieldErrors?.currentPassword ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {state.fieldErrors.currentPassword}
          </p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="new-password"
          className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
        >
          Nueva contraseña
        </label>
        <input
          id="new-password"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          disabled={pending}
          aria-invalid={state.fieldErrors?.newPassword ? true : undefined}
          className="w-full max-w-md rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none ring-neutral-400 focus:ring-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
        {state.fieldErrors?.newPassword ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {state.fieldErrors.newPassword}
          </p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="new-password-confirm"
          className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
        >
          Confirmar nueva contraseña
        </label>
        <input
          id="new-password-confirm"
          name="newPasswordConfirm"
          type="password"
          autoComplete="new-password"
          required
          disabled={pending}
          aria-invalid={
            state.fieldErrors?.newPasswordConfirm ? true : undefined
          }
          className="w-full max-w-md rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none ring-neutral-400 focus:ring-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
        {state.fieldErrors?.newPasswordConfirm ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {state.fieldErrors.newPasswordConfirm}
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
          Contraseña actualizada correctamente.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        {pending ? "Guardando…" : "Cambiar contraseña"}
      </button>
    </form>
  );
}
