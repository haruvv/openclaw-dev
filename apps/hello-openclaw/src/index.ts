export default {
  fetch(): Response {
    return new Response(
      "<!DOCTYPE html><html><body><h1>Hello OpenClaw</h1></body></html>",
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  },
} satisfies ExportedHandler;
