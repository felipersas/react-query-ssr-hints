# react-query-ssr-hints

> SSR query prefetch hints between client and server for React Query

Esta lib permite que aplicações SSR/SPA usando React Query evitem prefetch desnecessário no SSR ao reaproveitar metadados de cache existentes no cliente, via cookies ou headers. O servidor decide se deve executar ou não o prefetch de cada query, com base nas informações de stale/ttl enviadas pelo cliente.

## Motivação

Evite requisições duplicadas e ganhe performance ao passar apenas informações de cache (query key, staleUntil, TTL) do client para o SSR, sem risco de expor dados sensíveis nem precisar de cache compartilhado no backend.

---

## Conceito

1. O cliente serializa metadados das queries (sem os dados!) em cookie/header.
2. O servidor, ao renderizar via SSR, lê esses metadados.
3. Para cada query a ser pré-buscada, o SSR decide (com base nos hints) se ignora ou executa o fetch normalmente.
4. O HTML pode ser hidratado normalmente, evitando refetchs redundantes.

---

## Instalação

```bash
npm install react-query-ssr-hints
```

## Exemplo de uso rápido

Veja `/src` e contribua!

---

## TO-DO

- Integração direta com Next.js/Express middleware
- Suporte a configuração granular (TTL por query)
- Documentação de exemplos reais
