"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const todos = [];
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const newTodo = {
        text: req.body.text,
        id: new Date().toDateString(),
    };
    console.log("ID:" + newTodo.id + " , text:" + newTodo.text);
});
exports.default = router;
