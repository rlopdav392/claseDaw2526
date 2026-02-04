import { TicketItem } from "./ticket-item";
import { TICKETS } from "../data/tickets";

const TicketList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return (
    <div className="flex flex-1 flex-col items-center gap-y-4">
      {TICKETS.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export { TicketList };
