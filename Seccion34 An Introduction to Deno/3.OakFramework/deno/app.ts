import { Application } from "https://deno.land/x/oak/mod.ts";
import routerTodos from "./routes/todos.ts";

const app = new Application();

app.use(async (ctx, next) => {
  console.log("Middleware");
  await next();
});

app.use(routerTodos.routes());
app.use(routerTodos.allowedMethods());

await app.listen({ port: 3000 });

// Run with deno run --allow-net app.ts
