import { QueryClient } from "@tanstack/react-query";
import { QueryHint } from "../shared/types";

/**
 * Collects cache hints from a QueryClient instance in a way that is agnostic to TanStack Query v5+.
 * Avoids direct type dependencies and safely accesses config/options fields.
 */
export function collectCacheHints(client: QueryClient): QueryHint[] {
  return client
    .getQueryCache()
    .getAll()
    .map((query) => {
      const meta = query.state;
      // TanStack Query v5+ stores config in .options (sometimes .config in older v5)
      // This lib is agnostic: checks both, falls back to 0 if missing
      const opts = (query as any).options ?? (query as any).config ?? {};
      const cacheTime = typeof opts.cacheTime === "number" ? opts.cacheTime : 0;
      const staleTime = typeof opts.staleTime === "number" ? opts.staleTime : 0;
      return {
        key: JSON.stringify(query.queryKey),
        updatedAt: meta.dataUpdatedAt,
        ttl: cacheTime,
        staleUntil: meta.dataUpdatedAt + staleTime,
      };
    });
// ...existing code...
}

export function persistCacheHints(hints: QueryHint[]) {
  try {
    document.cookie = "QUERY_HINTS=" + encodeURIComponent(JSON.stringify(hints)) + "; path=/";
  } catch (e) {
    // localStorage fallback
    localStorage.setItem("QUERY_HINTS", JSON.stringify(hints));
  }
}