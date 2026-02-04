import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import Link from "next/link";
import type { Ticket } from "../data/tickets";
import { TicketMoreMenu } from "./ticket-more-menu";

import { LucidePencil } from "lucide-react";
import { ticketEditPath } from "@/paths";
import { Button } from "@/components/ui/button";

type TicketItemProps = {
  ticket: Ticket;
};
const TicketItem = async ({ ticket }: TicketItemProps) => {
  const editButton = (
    <Button variant="outline" size="icon">
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  );

  return (
    <div className="w-full flex gap-x-1 max-w-[580]">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center">
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className="whitespace-break-spaces">{ticket.content}</span>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {ticket.deadline} by {ticket.user.username}
          </p>
          <p className="text-sm text-muted-foreground">{ticket.bounty}</p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {editButton}
        <TicketMoreMenu ticket={ticket} />
      </div>
    </div>
  );
};

export { TicketItem };
