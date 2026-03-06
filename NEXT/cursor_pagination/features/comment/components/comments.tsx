"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getComments, CommentWithMetadata } from "../queries/get-comments";
import { PaginatedData } from "@/types/pagination";
import { CommentItem } from "./comment-item";
import { Spinner } from "@/components/spinner";

type Props = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

export function Comments({ ticketId, paginatedComments }: Props) {
  const queryKey = ["comments", ticketId] as const;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {comments.map((c) => (
        <CommentItem key={c.id} comment={c} />
      ))}

      {isFetchingNextPage && <Spinner />}

      <div ref={ref} style={{ padding: 8, textAlign: "right" }}>
        {!hasNextPage && (
          <span style={{ fontSize: 12, opacity: 0.7 }}>No more comments.</span>
        )}
      </div>
    </section>
  );
}
