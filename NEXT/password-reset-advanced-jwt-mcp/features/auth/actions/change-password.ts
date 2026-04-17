"use server";

import bcrypt from "bcryptjs";
import { changePasswordFormSchema } from "@/lib/validations/change-password";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";

export type ChangePasswordState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<
    Record<"currentPassword" | "newPassword" | "newPasswordConfirm", string>
  >;
};

export async function changePasswordAction(
  _prev: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const session = await getSession();
  if (!session) {
    return { error: "Sesión no válida. Vuelve a iniciar sesión." };
  }

  const parsed = changePasswordFormSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    newPasswordConfirm: formData.get("newPasswordConfirm"),
  });

  if (!parsed.success) {
    const fieldErrors: ChangePasswordState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (
        key === "currentPassword" ||
        key === "newPassword" ||
        key === "newPasswordConfirm"
      ) {
        fieldErrors[key] = issue.message;
      }
    }
    return { fieldErrors };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!user) {
    return { error: "Usuario no encontrado." };
  }

  const currentOk = await bcrypt.compare(
    parsed.data.currentPassword,
    user.password,
  );
  if (!currentOk) {
    return {
      fieldErrors: { currentPassword: "Contraseña actual incorrecta." },
    };
  }

  const hash = await bcrypt.hash(parsed.data.newPassword, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hash },
  });

  return { success: true };
}
