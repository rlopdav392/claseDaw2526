import { z } from "zod";

export const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(128, "Máximo 128 caracteres"),
    passwordConfirm: z.string().min(1, "Confirma la contraseña"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"],
  });
