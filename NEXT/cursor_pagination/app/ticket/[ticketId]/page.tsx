import { getComments } from "@/features/comment/queries/get-comments";
import { Comments } from "@/features/comment/components/comments";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params; // 👈 clave

  const firstPage = await getComments(ticketId, undefined);

  return (
    <main style={{ maxWidth: 520, margin: "0 auto", padding: 24 }}>
      <h1 style={{ marginBottom: 12 }}>Ticket {ticketId}</h1>

      <Comments ticketId={ticketId} paginatedComments={firstPage} />
    </main>
  );
}
