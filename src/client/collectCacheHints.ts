import { QueryClient } from "@tanstack/react-query";
import { QueryHint } from "../shared/types";

export function collectCacheHints(client: QueryClient): QueryHint[] {
  return client
    .getQueryCache()
    .getAll()
    .map((query) => {
      const meta = query.state;
      return {
        key: JSON.stringify(query.queryKey),
        updatedAt: meta.dataUpdatedAt,
        ttl: meta.gcTime ?? 0,
        staleUntil: meta.dataUpdatedAt + (meta.staleTime ?? 0),
      };
    });
}

export function persistCacheHints(hints: QueryHint[]) {
  try {
    document.cookie = "QUERY_HINTS=" + encodeURIComponent(JSON.stringify(hints)) + "; path=/";
  } catch (e) {
    // fallback para localStorage, se quiser
  }
}