import { randomUUID } from "crypto";
import { signPasswordResetToken } from "@/lib/password-reset-jwt";
import { prisma } from "@/lib/prisma";

/**
 * Genera nonce en BD + JWT; el token solo viaja en la URL (nunca en cookies).
 */
export async function generatePasswordResetLink(
  userId: string,
): Promise<string> {
  const nonce = randomUUID();

  await prisma.user.update({
    where: { id: userId },
    data: { passwordResetNonce: nonce },
  });

  const token = await signPasswordResetToken(userId, nonce);
  const encoded = encodeURIComponent(token);

  const baseUrl = (process.env.APP_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );
  const pageUrl = `${baseUrl}/reset-password`;

  return `${pageUrl}/${encoded}`;
}
