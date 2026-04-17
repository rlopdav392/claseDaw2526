import { Resend } from "resend";
import PasswordResetEmail from "@/emails/password/email-password-reset";

export async function sendPasswordResetEmail(
  username: string,
  email: string,
  passwordResetLink: string,
) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey) {
    console.warn(
      "[sendPasswordResetEmail] RESEND_API_KEY no configurado; no se envía email.",
    );
    return { error: "missing_api_key" as const };
  }

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Restablecer contraseña",
      react: (
        <PasswordResetEmail toName={username} url={passwordResetLink} />
      ),
    });
    return result;
  } catch (error) {
    console.error("[sendPasswordResetEmail] Error al llamar a Resend", error);
    return { error };
  }
}
