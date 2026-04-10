import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Comments } from "@/features/comment/components/comments";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;

  return (
    <NuqsAdapter>
      <div className="max-w-[520px] mx-auto w-full py-8">
        <h1 className="text-2xl font-bold mb-4">Ticket {ticketId}</h1>
        <Comments ticketId={ticketId} />
      </div>
    </NuqsAdapter>
  );
}
