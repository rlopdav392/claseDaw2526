"use server";

type ActionState = {
  status?: "IDLE" | "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  fieldErrors?: Record<string, string[] | undefined>;
  timestamp: number;
};
export const deleteTicket = async (id: string): Promise<ActionState> => {
  try {
    /* Aqui borraría el ticket 
    if (id) {
      const ticket = await prisma.ticket.findUnique({ where: { id } });

      const istIcketOwner = user?.id === ticket?.userId;

      if (!istIcketOwner || !ticket) {
        return {
          status: "ERROR",
          message: "Not authorized",
          timestamp: Date.now(),
        };
      }
    }

    await prisma.ticket.delete({ where: { id } });
*/
    console.log("borrando id", id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      status: "SUCCESS",
      message: "Ticket deleted",
      timestamp: Date.now(),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    return { status: "ERROR", message, timestamp: Date.now() };
  }
};
