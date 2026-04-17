import { z } from "zod";

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Introduce tu contraseña actual"),
    newPassword: z
      .string()
      .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
      .max(128, "Máximo 128 caracteres"),
    newPasswordConfirm: z.string().min(1, "Confirma la nueva contraseña"),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "Las contraseñas nuevas no coinciden",
    path: ["newPasswordConfirm"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "La nueva contraseña debe ser distinta de la actual",
    path: ["newPassword"],
  });
