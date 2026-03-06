"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useQueryState, useQueryStates } from "nuqs";
import { CommentItem } from "./comment-item";
import { CommentSearchInput } from "./comment-search-input";
import { CommentSortSelect } from "./comment-sort-select";
import { getComments } from "../queries/get-comments";
import { searchParser, sortParser, sortOptions } from "../search-params";

type Props = {
  ticketId: string;
};

export function Comments({ ticketId }: Props) {
  const [search] = useQueryState("search", searchParser.search);
  const [sort] = useQueryStates(sortParser, sortOptions);

  const queryKey = ["comments", ticketId, search, sort.sortKey, sort.sortValue] as const;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) =>
        getComments(ticketId, pageParam, search, sort.sortKey, sort.sortValue),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
    });

  const comments = data?.pages.flatMap((page) => page.list) ?? [];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return (
    <>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <CommentSearchInput />
        <CommentSortSelect />
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Cargando comentarios...</p>
      ) : (
        <>
          <div className="flex flex-col gap-y-2">
            {comments.length === 0 && (
              <p className="text-sm text-gray-500">No hay comentarios.</p>
            )}

            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}

            {isFetchingNextPage && (
              <p className="text-center text-sm text-gray-500 py-4">
                Cargando más comentarios...
              </p>
            )}
          </div>

          <div ref={ref}>
            {!hasNextPage && comments.length > 0 && (
              <p className="text-right text-xs italic">No hay más comentarios.</p>
            )}
          </div>
        </>
      )}
    </>
  );
}
