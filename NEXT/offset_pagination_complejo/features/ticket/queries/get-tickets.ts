import ticketsData from "@/data/tickets.json";
import { ParsedSearchParams } from "../search-params";

type Ticket = {
  id: string;
  userId: string;
  title: string;
  content: string;
  bounty: number;
  createdAt: string;
};

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) => {
  const all = ticketsData as Ticket[];

  // where: userId + title contains search (insensitive)
  const search = (searchParams.search ?? "").toLowerCase();

  let filtered = all.filter((t) => {
    const sameUser = userId ? t.userId === userId : true;
    const matches = t.title.toLowerCase().includes(search);
    return sameUser && matches;
  });

  // orderBy: {[sortKey]: sortValue}
  const { sortKey, sortValue } = searchParams;

  filtered.sort((a, b) => {
    const dir = sortValue === "asc" ? 1 : -1;

    if (sortKey === "bounty") {
      return (a.bounty - b.bounty) * dir;
    }

    // createdAt default
    const da = new Date(a.createdAt).getTime();
    const db = new Date(b.createdAt).getTime();
    return (da - db) * dir;
  });

  // pagination: skip/take (offset)
  const skip = searchParams.size * searchParams.page;
  const take = searchParams.size;

  const count = filtered.length;
  const pageItems = filtered.slice(skip, skip + take);

  return {
    list: pageItems.map((t) => ({
      ...t,
      // en tu proyecto esto venía de isOwner(user,ticket)
      isOwner: userId ? t.userId === userId : false,
      user: { username: t.userId }, // fake
    })),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
