import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { passwordResetEvent } from "@/features/password/events/event-password-reset";

/**
 * Inngest: sincronización de funciones y ejecución de pasos.
 * URL local: http://localhost:3000/api/inngest
 * (Ejecutar `npm run dev` desde la raíz de este proyecto `password-reset-advanced-jwt-mcp`.)
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handler = serve({
  client: inngest,
  functions: [passwordResetEvent],
});

export const GET = handler.GET;
export const POST = handler.POST;
export const PUT = handler.PUT;
