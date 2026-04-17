import { prisma } from "@/lib/prisma";
import { isResetNonceValid } from "@/lib/password-reset-nonce";
import {
  verifyPasswordResetToken,
  type PasswordResetClaims,
} from "@/lib/password-reset-jwt";

/**
 * Valida JWT de reset en servidor y coherencia con BD (nonce = un solo uso lógico).
 * No consume el nonce; llamar a `clearPasswordResetNonce` tras actualizar contraseña.
 */
export async function validatePasswordResetToken(
  token: string,
): Promise<PasswordResetClaims & { valid: true }> {
  const claims = await verifyPasswordResetToken(token);

  const user = await prisma.user.findUnique({
    where: { id: claims.userId },
    select: { passwordResetNonce: true },
  });

  if (!user || !isResetNonceValid(user.passwordResetNonce, claims.nonce)) {
    throw new Error("Token de reset inválido o ya utilizado");
  }

  return { ...claims, valid: true };
}

export async function clearPasswordResetNonce(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: { passwordResetNonce: null },
  });
}
