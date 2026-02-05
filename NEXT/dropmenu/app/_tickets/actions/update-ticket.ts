"use server";

import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";

export const UpdateTicketStatus = async (id: string, status: string) => {
  /* const { user } = await getAuth();

  if (!user) redirect(signInPath()); */
  try {
    /*
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
       await prisma.ticket.update({ where: { id }, data: { status } });
      */
    console.log(`actualizando ${id} al estado ${status}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    revalidatePath(ticketsPath());
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return {
        status: "ERROR",
        message: error.message,
        timestamp: Date.now(),
      };
    } else {
      return {
        status: "ERROR",
        message: "something went wrong",
        timestamp: Date.now(),
      };
    }
  }
  return {
    status: "SUCCESS",
    message: "Status updated",
    timestamp: Date.now(),
  };
};
