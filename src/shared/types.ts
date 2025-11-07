export interface QueryHint {
  key: string; // JSON-stringified version of the queryKey
  updatedAt: number; // timestamp (ms) de atualização do dado
  ttl: number; // tempo de vida (ms, opcional)
  staleUntil?: number; // timestamp (ms) até ser considerado stale
}