const server = Bun.serve({
  port: process.env.PORT ?? 3001,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response(JSON.stringify({ message: "Mavi API", status: "ok" }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
