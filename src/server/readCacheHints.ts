import { QueryHint } from "../shared/types";

function parseCookie(cookieHeader: string | undefined, name: string): string | null {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map((p) => p.trim());
  const res = parts.find((c) => c.startsWith(name + "="));
  return res ? decodeURIComponent(res.slice(name.length + 1)) : null;
}

export function getClientCacheHints(req: { headers: { [k: string]: string | string[] | undefined } }): QueryHint[] {
  const raw = parseCookie(String(req.headers.cookie || ""), "QUERY_HINTS");
  if (!raw) return [];
  try {
    return JSON.parse(raw) as QueryHint[];
  } catch {
    return [];
  }
}