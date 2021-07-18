import { serve } from "https://deno.land/std@0.101.0/http/server.ts";
const server = serve({ port: 3000 });

console.log("http://localhost:3000/");

for await (const req of server) {
  req.respond({ body: "Hello World\n" });
}
// run as deno run --allow-net app.ts
