"use client";

import products from "@/data/products.json";
import { useMemo } from "react";
import { useQueryState, parseAsInteger } from "nuqs";

const LIMIT = 10;

export default function ProductsClient() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const safePage = Math.max(1, page ?? 1);

  const totalPages = Math.max(1, Math.ceil(products.length / LIMIT));

  const clampedPage = Math.min(safePage, totalPages);

  const offset = (clampedPage - 1) * LIMIT;

  const pageItems = useMemo(() => {
    return products.slice(offset, offset + LIMIT);
  }, [offset]);

  const canPrev = clampedPage > 1;
  const canNext = clampedPage < totalPages;

  return (
    <section>
      <div style={{ marginBottom: 12, opacity: 0.8 }}>
        <div>
          <strong>URL state:</strong> /products?page={clampedPage}
        </div>
        <div>
          <strong>limit:</strong> {LIMIT} — <strong>offset:</strong> {offset}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setPage(clampedPage - 1)} disabled={!canPrev}>
          Prev
        </button>

        <div style={{ alignSelf: "center" }}>
          Page <strong>{clampedPage}</strong> / {totalPages}
        </div>

        <button onClick={() => setPage(clampedPage + 1)} disabled={!canNext}>
          Next
        </button>
      </div>

      <ul style={{ paddingLeft: 18 }}>
        {pageItems.map((p) => (
          <li key={p.id} style={{ marginBottom: 6 }}>
            <strong>{p.name}</strong> — {p.price}€
          </li>
        ))}
      </ul>
    </section>
  );
}
