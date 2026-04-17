import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";

/**
 * JWT de reset: solo en URL, no en cookies (ARCHITECTURE.md — Reset password JWT).
 * Expiración corta + nonce en BD para un solo uso lógico.
 */

function getSecret(): Uint8Array {
  const s = process.env.PASSWORD_RESET_JWT_SECRET;
  if (!s || s.length < 8) {
    throw new Error(
      "PASSWORD_RESET_JWT_SECRET debe existir (mínimo 8 caracteres para HS256).",
    );
  }
  return new TextEncoder().encode(s);
}

export async function signPasswordResetToken(
  userId: string,
  nonce: string,
): Promise<string> {
  return new SignJWT({ userId, nonce })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(getSecret());
}

export type PasswordResetClaims = {
  userId: string;
  nonce: string;
};

export async function verifyPasswordResetToken(
  token: string,
): Promise<PasswordResetClaims> {
  const { payload } = await jwtVerify(token, getSecret());
  const userId = payload.userId;
  const nonce = payload.nonce;
  if (typeof userId !== "string" || typeof nonce !== "string") {
    throw new Error("Token de reset inválido");
  }
  return { userId, nonce };
}
