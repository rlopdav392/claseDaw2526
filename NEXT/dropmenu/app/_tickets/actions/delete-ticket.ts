"use server";

import { redirect } from "next/navigation";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { setCookieByKey } from "@/actions/cookies";

type ActionState = {
  status?: "IDLE" | "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  fieldErrors?: Record<string, string[] | undefined>;
  timestamp: number;
};
export const deleteTicket = async (id: string): Promise<ActionState> => {
  try {
    if (id) {
      //TODO: Obtengo el ticket a borrar de la base de datos, y compruebo que exista y que es el propietario
      /*
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
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "ERROR",
        message: error.message,
      } as ActionState;
    } else {
      return {
        status: "ERROR",
        message: "something went wrong",
      } as ActionState;
    }
  }
  revalidatePath(ticketsPath());
  await setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath());
};
