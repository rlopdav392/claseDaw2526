"use server";

import bcrypt from "bcryptjs";
import { resetPasswordFormSchema } from "@/lib/validations/reset-password";
import { prisma } from "@/lib/prisma";
import { validatePasswordResetToken } from "@/lib/password-reset-server";

export type ResetPasswordState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"password" | "passwordConfirm", string>>;
};

export async function resetPasswordAction(
  _prev: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const tokenRaw = formData.get("token");
  const token = typeof tokenRaw === "string" ? tokenRaw : "";

  const parsed = resetPasswordFormSchema.safeParse({
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  });

  if (!parsed.success) {
    const fieldErrors: ResetPasswordState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "password" || key === "passwordConfirm") {
        fieldErrors[key] = issue.message;
      }
    }
    return { fieldErrors };
  }

  let userId: string;
  try {
    const { userId: uid } = await validatePasswordResetToken(token);
    userId = uid;
  } catch {
    return {
      error: "El enlace no es válido, ha caducado o ya se ha utilizado.",
    };
  }

  const hash = await bcrypt.hash(parsed.data.password, 12);

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hash,
      passwordResetNonce: null,
    },
  });

  return { success: true };
}
