import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().email("Email no válido"),
  username: z
    .string()
    .trim()
    .min(2, "El nombre de usuario debe tener al menos 2 caracteres")
    .max(32, "Máximo 32 caracteres")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Solo letras, números, guión y guión bajo",
    ),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(128, "Máximo 128 caracteres"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
