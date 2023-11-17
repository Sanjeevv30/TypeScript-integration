"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newtodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newtodo);
    res
        .status(201)
        .json({ message: "posted successfully", todo: newtodo, todos: todos });
});
router.put("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    const body = req.body;
    const tid = params.todoId;
    const todoIndex = todos.findIndex((todoitem) => todoitem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({ message: "Updated Successfully" });
    }
    res.status(404).json({ Message: "could not find Todo for this Id " });
});
router.delete("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    todos = todos.filter((todoitem) => todoitem.id !== params.todoId);
    res.status(200).json({ message: "Deleted successfully", todos: todos });
});
exports.default = router;
