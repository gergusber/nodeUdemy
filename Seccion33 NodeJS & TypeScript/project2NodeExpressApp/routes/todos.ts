import { json, Router } from "express";
import { read } from "fs";
import { nextTick } from "process";
import { Todo } from "../models/todo";
const router = Router();

let todos: Todo[] = [];
type RequestBody = { text: string };
type RequestParams = { todoId: string };
router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    text: body.text,
    id: new Date().toDateString(),
  };
  console.log("ID:" + newTodo.id + " , text:" + newTodo.text);
  todos.push(newTodo);

  return res
    .status(201)
    .json({ message: "Created todo", todo: newTodo, todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const todoId = params.todoId;
  const body = req.body as RequestBody;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === todoId);
  if (todoIndex >= 0) {
    todos[todoIndex] = {
      id: todoId,
      text: body.text,
    };

    return res.status(200).json({ message: "Updated todo", todos: todos });
  }
  res.status(404).json({ message: "could not find for this id" });

  const newTodo: Todo = {
    text: body.text,
    id: new Date().toDateString(),
  };
  console.log("ID:" + newTodo.id + " , text:" + newTodo.text);
  todos.push(newTodo);
});

router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
  res.status(200).json({ message: "Todo item removed properly", todos: todos });
});
export default router;
