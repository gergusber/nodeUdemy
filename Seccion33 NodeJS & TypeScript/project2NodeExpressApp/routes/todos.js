"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
let todos = [];
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
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
    const params = req.params;
    const todoId = params.todoId;
    const body = req.body;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === todoId);
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: todoId,
            text: body.text,
        };
        return res.status(200).json({ message: "Updated todo", todos: todos });
    }
    res.status(404).json({ message: "could not find for this id" });
    const newTodo = {
        text: body.text,
        id: new Date().toDateString(),
    };
    console.log("ID:" + newTodo.id + " , text:" + newTodo.text);
    todos.push(newTodo);
});
router.delete("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
    res.status(200).json({ message: "Todo item removed properly", todos: todos });
});
exports.default = router;
