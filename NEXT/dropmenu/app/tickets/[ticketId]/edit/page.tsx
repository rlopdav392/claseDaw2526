import { CardCompact } from "@/components/card-compact";

type TicketEditPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};
const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const { ticketId } = await params;

  return (
    <div>
      <CardCompact
        title="edit ticket"
        description="edit an existing ticket"
        className="w-full max-w-105 animate-fade-in-from-top"
        content={ticketId}
      />
    </div>
  );
};

export default TicketEditPage;
