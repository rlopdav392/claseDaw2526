import commentsData from "@/data/comments.json";
import { PaginatedData } from "@/types/pagination";

export type CommentWithMetadata = {
  id: string;
  ticketId: string;
  content: string;
  createdAt: string;
  username: string;
  isOwner: boolean;
};

const TAKE = 5;

export const getComments = async (
  ticketId: string,
  cursor?: string,
  search?: string,
  sortKey?: string,
  sortValue?: string,
): Promise<PaginatedData<CommentWithMetadata>> => {
  const all = commentsData as Omit<CommentWithMetadata, "isOwner">[];

  let filtered = all.filter((c) => c.ticketId === ticketId);

  // Filtrado por búsqueda
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.content.toLowerCase().includes(q) ||
        c.username.toLowerCase().includes(q),
    );
  }

  // Ordenación
  const key = sortKey ?? "createdAt";
  const dir = sortValue === "asc" ? 1 : -1;

  filtered.sort((a, b) => {
    if (key === "username") {
      return a.username.localeCompare(b.username) * dir;
    }
    const da = new Date(a.createdAt).getTime();
    const db = new Date(b.createdAt).getTime();
    if (da !== db) return (da - db) * dir;
    return Number(b.id) - Number(a.id);
  });

  // Cursor
  if (cursor) {
    filtered = filtered.filter((c) => Number(c.id) < Number(cursor));
  }

  let page = filtered.slice(0, TAKE + 1);
  const hasNextPage = page.length > TAKE;
  page = hasNextPage ? page.slice(0, -1) : page;

  return {
    list: page.map((c) => ({ ...c, isOwner: true })),
    metadata: {
      count: filtered.length,
      hasNextPage,
      cursor: page.at(-1)?.id,
    },
  };
};
