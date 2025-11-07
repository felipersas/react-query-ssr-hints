import { QueryHint } from "../shared/types";

export function shouldPrefetchQuery(
  queryKey: unknown,
  cacheHints: QueryHint[],
  now = Date.now()
): boolean {
  const keyString = JSON.stringify(queryKey);
  const found = cacheHints.find((h) => h.key === keyString);
  if (!found) return true;
  if (found.staleUntil && now < found.staleUntil) return false;
  return true;
}