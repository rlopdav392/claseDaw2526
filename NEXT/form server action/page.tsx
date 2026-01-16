import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import PlaceHolder from "@/components/placeholder";
import { Spinner } from "@/components/spinner";
import TicketItem from "@/features/tickets/components/ticket-item";
import { getTicket } from "@/features/tickets/queries/get-ticket";
import { ticketsPath } from "@/paths";

type ticketPageProps = { params: { ticketId: string } };
const TicketPage = async ({ params }: ticketPageProps) => {
  const { ticketId } = params;
  const ticket = await getTicket(ticketId);
  if (!ticket) {
    notFound();
  }

  /*  if (!ticket) {
    return (
      <PlaceHolder
        label="Ticket not found"
        button={<Link href={ticketsPath()}>Go to tickets</Link>}
      />
    );
  } */
  /*   return (
    <div className="flex justify-center animade-fade-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
 */
  return (
    <div className="flex justify-center animade-fade-from-top">
      <ErrorBoundary fallback={<PlaceHolder label="Something went wrong" />}>
        <Suspense fallback={<Spinner />}>
          <TicketItem ticket={ticket} isDetail />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TicketPage;
