import { ReactNode, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { collectCacheHints, persistCacheHints } from "./client/collectCacheHints";

export function CacheTransportProvider({ children }: { children: ReactNode }) {
  const client = useQueryClient();
  useEffect(() => {
    const hints = collectCacheHints(client);
    persistCacheHints(hints);
  });
  return <>{children}</>;
}