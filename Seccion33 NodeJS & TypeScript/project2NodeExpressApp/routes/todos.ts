import { json, Router } from "express";
import { read } from "fs";
import { nextTick } from "process";
import { Todo } from "../models/todo";
const router = Router();

let todos: Todo[] = [];

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const newTodo: Todo = {
    text: req.body.text,
    id: new Date().toDateString(),
  };
  console.log("ID:" + newTodo.id + " , text:" + newTodo.text);
  todos.push(newTodo);

  return res
    .status(201)
    .json({ message: "Created todo", todo: newTodo, todos: todos });
});

router.put("/todo/:id", (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === todoId);
  if (todoIndex >= 0) {
    todos[todoIndex] = {
      id: todoId,
      text: req.body.text,
    };

    return res.status(200).json({ message: "Updated todo", todos: todos });
  }
  res.status(404).json({ message: "could not find for this id" });

  const newTodo: Todo = {
    text: req.body.text,
    id: new Date().toDateString(),
  };
  console.log("ID:" + newTodo.id + " , text:" + newTodo.text);
  todos.push(newTodo);
});

router.delete("/todo/:todoId", (req, res, next) => {
  todos = todos.filter((todoItem) => todoItem.id !== req.params.todoId);
  res.status(200).json({ message: "Todo item removed properly", todos: todos });
});
export default router;
