import express from "express";
import { toDoControlers } from "./toDo.controllers";
const router = express.Router();
router.post("/", toDoControlers.createTodo);
router.get("/", toDoControlers.getTodod);
router.get("/:id", toDoControlers.getSingleTodo);
router.put("/:id", toDoControlers.updateTodo);
router.delete("/:id", toDoControlers.deleteTodo);
export const todoRouter = router;
