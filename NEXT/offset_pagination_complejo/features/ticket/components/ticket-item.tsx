type Props = {
  ticket: {
    id: string;
    title: string;
    content: string;
    bounty: number;
    createdAt: string;
    isOwner: boolean;
    user: { username: string };
  };
};

const TicketItem = ({ ticket }: Props) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12 }}>
      <div style={{ fontWeight: 700 }}>{ticket.title}</div>
      <div style={{ opacity: 0.8 }}>{ticket.content}</div>
      <div style={{ marginTop: 6, fontSize: 12, opacity: 0.8 }}>
        bounty={ticket.bounty} · createdAt={ticket.createdAt} · user=
        {ticket.user.username} · isOwner={String(ticket.isOwner)}
      </div>
    </div>
  );
};

export { TicketItem };
