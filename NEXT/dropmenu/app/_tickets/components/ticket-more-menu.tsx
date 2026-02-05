"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { LucideMoreVertical } from "lucide-react";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { deleteTicket } from "../actions/delete-ticket";
import { LucideTrash } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { LucidePencil } from "lucide-react";
import type { Ticket } from "../data/tickets";
import { toast } from "sonner";
import { UpdateTicketStatus } from "../actions/update-ticket";
type TicketMoreMenuProps = {
  ticket: Ticket;
};

const ticketEditPath = (ticketId: string) => `/tickets/${ticketId}/edit`;

const TicketMoreMenu = ({ ticket }: TicketMoreMenuProps) => {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteState, deleteFormAction] = useActionState(
    deleteTicket.bind(null, ticket.id),
    { status: "IDLE", message: "", timestamp: 0 },
  );

  useEffect(() => {
    if (deleteState.status === "ERROR") {
      toast.error(deleteState.message);
    }
    if (deleteState.status === "SUCCESS") {
      console.log("sucess");
      toast.success(deleteState.message);
      router.refresh();
    }
  }, [deleteState.timestamp]);

  const handleUpdateTicketStatus = async (value: string) => {
    const promise = UpdateTicketStatus(ticket.id, value);
    toast.promise(promise, { loading: "updating status..." });
    const result = await promise;

    if (result.status === "ERROR") toast.error(result.message);
    if (result.status === "SUCCESS") toast.success(result.message);
  };

  return (
    <>
      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete ticket?"
        description="This action cannot be undone."
        formAction={deleteFormAction}
        confirmLabel="Confirm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <LucideMoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          <DropdownMenuItem asChild>
            <Link
              href={ticketEditPath(ticket.id)}
              className="flex items-center gap-2"
            >
              <LucidePencil className="h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsDeleteOpen(true)}>
            <LucideTrash className="h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value="DONE"
            onValueChange={handleUpdateTicketStatus}
          >
            <DropdownMenuRadioItem value="OPEN">Open</DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="IN_PROGRESS">
              In Progress
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="DONE">Done</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { TicketMoreMenu };
