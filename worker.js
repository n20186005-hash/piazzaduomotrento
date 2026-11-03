import handler from "./.open-next/worker.js";

// Use the edge Request URL, never client-controlled forwarding headers.
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const publicHost = url.hostname === "piazzaduomotrento.com" ||
      url.hostname === "www.piazzaduomotrento.com";
    if (publicHost && (url.hostname !== "www.piazzaduomotrento.com" || url.protocol !== "https:")) {
      return new Response(null, {
        status: 308,
        headers: { Location: `https://www.piazzaduomotrento.com${url.pathname}${url.search}` },
      });
    }
    // Forward authoritative values so downstream Next middleware cannot be
    // influenced by a forged Host or X-Forwarded-Proto header.
    const headers = new Headers(request.headers);
    headers.set("host", url.host);
    headers.set("x-forwarded-host", url.host);
    headers.set("x-forwarded-proto", url.protocol.slice(0, -1));
    const normalizedRequest = new Request(request, { headers });
    if (request.method === "GET" || request.method === "HEAD") {
      const assetResponse = await env.ASSETS.fetch(normalizedRequest);
      if (assetResponse.status !== 404) return assetResponse;
    }
    const response = await handler.fetch(normalizedRequest, env, ctx);
    if (response.status === 404) {
      const notFound = new Response(response.body, response);
      notFound.headers.set("X-Robots-Tag", "noindex");
      return notFound;
    }
    return response;
  },
};

export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./.open-next/worker.js";
