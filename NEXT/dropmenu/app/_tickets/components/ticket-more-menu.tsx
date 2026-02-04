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

import { useConfirmDialog } from "@/components/confirm-dialog";
import { deleteTicket } from "../actions/delete-ticket";
import { LucideTrash } from "lucide-react";

import Link from "next/link";

import { LucidePencil } from "lucide-react";
import type { Ticket } from "../data/tickets";

type TicketMoreMenuProps = {
  ticket: Ticket;
};

const ticketEditPath = (ticketId: string) => `/tickets/${ticketId}/edit`;

const TicketMoreMenu = ({ ticket }: TicketMoreMenuProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className="h-4 w-4"></LucideTrash>
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  });
  const handleUpdateTicketStatus = async (value: string) => {
    console.log("actualizando estado", value);
  };

  return (
    <>
      {deleteDialog}
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
          {deleteButton}

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
