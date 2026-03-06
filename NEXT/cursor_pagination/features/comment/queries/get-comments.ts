import commentsData from "@/data/comments.json";
import { PaginatedData } from "@/types/pagination";

export type CommentWithMetadata = {
  id: string;
  ticketId: string;
  content: string;
  createdAt: string;
  username: string;
  isOwner: boolean; // en tu zip venía de isOwner(user, comment)
};

const TAKE = 2;

export const getComments = async (
  ticketId: string,
  cursor?: string,
): Promise<PaginatedData<CommentWithMetadata>> => {
  const all = commentsData as Omit<CommentWithMetadata, "isOwner">[];

  // 1) where ticketId
  let filtered = all.filter((c) => c.ticketId === ticketId);

  // 2) orderBy [{ createdAt: "desc" }, { id: "desc" }]
  filtered.sort((a, b) => {
    const da = new Date(a.createdAt).getTime();
    const db = new Date(b.createdAt).getTime();
    if (da !== db) return db - da;

    // id desc (numérico)
    return Number(b.id) - Number(a.id);
  });

  // 3) cursor filter (equivalente a id: { lt: cursor })
  if (cursor) {
    filtered = filtered.filter((c) => Number(c.id) < Number(cursor));
  }

  // 4) take + 1 para saber si hay next page
  let page = filtered.slice(0, TAKE + 1);

  const hasNextPage = page.length > TAKE;
  page = hasNextPage ? page.slice(0, -1) : page;

  return {
    list: page.map((c) => ({
      ...c,
      isOwner: true, // simplificado (tu zip lo calculaba con sesión)
    })),
    metadata: {
      count: filtered.length,
      hasNextPage,
      cursor: page.at(-1)?.id,
    },
  };
};
