import { Router } from "https://deno.land/x/oak/mod.ts";
const router = new Router();

interface Todo {
  id: string;
  text: string;
}
type todoRequest = {
  text: string;
};

let todos: Todo[] = [];
router.get("/todos", (ctx) => {
  ctx.response.body = { todos: todos };
  //   ctx.response.status = 200;
});
router.post("/todos", async (ctx) => {
  //   const req = ctx.request.body as todoRequest;
  const data = await ctx.request.body();
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: data.value.text,
  };
  todos.push(newTodo);
  ctx.response.body = { message: "Created Todo", todos: todos, todo: newTodo };
});
router.put("/todos/:todoId", async (ctx) => {
  const tId = ctx.params.todoId;
  const data = await ctx.request.body();

  const updateText = data.value.text;
  const tIndex = todos.findIndex((x) => x.id === tId);
  if (tIndex >= 0) {
    todos[tIndex] = { id: [tIndex].id, text: updateText };
    return (ctx.response.body = { message: "updated correctly", todos: todos });
  }
  return (ctx.response.body = { message: "Cannot update", todos: todos });
});
router.delete("/todos/:todoId", (ctx) => {
  const tId = ctx.params.todoId;
  todos = todos.filter((x) => x.id !== tId);
  return (ctx.response.body = { message: "Deleted correctly", todos: todos });
});

export default router;
