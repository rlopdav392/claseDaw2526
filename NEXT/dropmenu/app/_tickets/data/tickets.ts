export type TicketStatus = "OPEN" | "DONE" | "IN_PROGRESS";

export type Ticket = {
  id: string;
  title: string;
  content: string;
  status: TicketStatus;
  bounty: number;
  deadline: string;
  user: {
    username: string;
  };
};

export const TICKETS: Ticket[] = [
  {
    id: "1",
    title: "Ticket 1",
    content: "First ticket from JSON",
    status: "DONE",
    bounty: 499,
    deadline: "2026-02-04",
    user: { username: "admin" },
  },
  {
    id: "2",
    title: "Ticket 2",
    content: "Second ticket from JSON",
    status: "OPEN",
    bounty: 399,
    deadline: "2026-02-04",
    user: { username: "rocio" },
  },
  {
    id: "3",
    title: "Ticket 3",
    content: "Third ticket from JSON",
    status: "IN_PROGRESS",
    bounty: 599,
    deadline: "2026-02-04",
    user: { username: "rocio" },
  },
];
