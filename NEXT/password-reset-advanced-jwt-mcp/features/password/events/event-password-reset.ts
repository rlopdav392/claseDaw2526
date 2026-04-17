import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import { generatePasswordResetLink } from "@/features/password/utils/generate-password-reset-link";

export const passwordResetEvent = inngest.createFunction(
  {
    id: "password-reset-jwt",
    triggers: [{ event: "app/password.password-reset" }],
  },
  async ({ event, step }) => {
    const { userId } = event.data as { userId: string };

    return step.run("enviar-email-reset", async () => {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
      });

      const passwordResetLink = await generatePasswordResetLink(user.id);
      await sendPasswordResetEmail(user.username, user.email, passwordResetLink);

      return { passwordResetLink };
    });
  },
);
