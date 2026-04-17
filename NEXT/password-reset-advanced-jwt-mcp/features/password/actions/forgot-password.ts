"use server";

import { forgotPasswordSchema } from "@/lib/validations/forgot-password";
import { prisma } from "@/lib/prisma";
import { inngest } from "@/lib/inngest";
import {
  isInngestDevMode,
  isLikelyInvalidInngestEventKey,
} from "@/lib/inngest-env";
import { sendPasswordResetEmail } from "@/lib/email";
import { generatePasswordResetLink } from "@/features/password/utils/generate-password-reset-link";

export type ForgotPasswordState = {
  success?: boolean;
  error?: string;
  fieldErrors?: { email?: string };
};

export async function forgotPasswordAction(
  _prev: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const raw = formData.get("email");
  const parsed = forgotPasswordSchema.safeParse({
    email: typeof raw === "string" ? raw : "",
  });

  if (!parsed.success) {
    const fieldErrors: ForgotPasswordState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      if (issue.path[0] === "email") {
        fieldErrors.email = issue.message;
      }
    }
    return { fieldErrors };
  }

  const { email } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    if (
      !isInngestDevMode() &&
      isLikelyInvalidInngestEventKey(process.env.INNGEST_EVENT_KEY)
    ) {
      console.warn(
        "[forgotPassword] INNGEST_EVENT_KEY vacía o placeholder (modo cloud): inngest.send() fallará; se intentará Resend.",
      );
    }
    try {
      const { ids } = await inngest.send({
        name: "app/password.password-reset",
        data: { userId: user.id },
      });
      console.log("[forgotPassword] Inngest evento enviado", {
        ids,
        event: "app/password.password-reset",
      });
    } catch (err) {
      console.error(
        "[forgotPassword] inngest.send() falló; usando Resend como respaldo",
        err,
      );
      try {
        const link = await generatePasswordResetLink(user.id);
        await sendPasswordResetEmail(user.username, user.email, link);
      } catch (fallbackErr) {
        console.error(
          "[forgotPassword] El envío directo con Resend también falló",
          fallbackErr,
        );
      }
    }
  }

  return { success: true };
}
