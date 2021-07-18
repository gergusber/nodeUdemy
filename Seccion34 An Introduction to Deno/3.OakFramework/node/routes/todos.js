const { Router } = require("express");
const express = require("express");

const router = express.Router();

let todos = [];

router.get("/todos", (req, res, next) => {
  res.json({ todos: todos });
});

router.post("/todos", (req, res, next) => {
  const newTodo = { id: new Date().toISOString(), text: req.body.text };
  todos.push(newTodo);
  return res
    .status(201)
    .json({ message: "Created correctly", todos: todos, todo: newTodo });
});

router.put("/todos/:todoId", (req, res, next) => {
  const tId = req.params.todoId;
  const updateText = req.body.text;
  const tIndex = todos.findIndex((x) => x.id === tId);
  if (tIndex >= 0) {
    todos[tIndex] = { id: [tIndex].id, text: updateText };
    return res.status(200).json({ message: "updated correctly", todos: todos });
  }
  return res.status(404).json({ message: "Cannot update", todos: todos });
});

router.delete("/todos/:todoId", (req, res, next) => {
  const tId = req.params.todoId;
  todos = todos.filter((x) => x.id !== tId);
  return res.status(200).json({ message: "Deleted correctly", todos: todos });
});

module.exports = router;
