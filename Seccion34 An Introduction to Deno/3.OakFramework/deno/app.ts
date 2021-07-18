import { Application } from "https://deno.land/x/oak/mod.ts";
import routerTodos from "./routes/todos.ts";

const app = new Application();

app.use(routerTodos.routes());
app.use(routerTodos.allowedMethods());
// app.use((ctx) => {
//   ctx.response.body = "Hello World!";
// });

await app.listen({ port: 3000 });

// Run with deno run --allow-net app.ts
