import { Router } from "express";
import {
  addTodoItem,
  getTodoItem,
  deleteTodoItem,
  updateTodoItem,
} from "../controllers/todo.controllers.js";
const todoRoute = Router();

todoRoute.get("/", getTodoItem);
todoRoute.post("/", addTodoItem);
todoRoute.delete("/:id", deleteTodoItem);
todoRoute.patch("/:id", updateTodoItem);

export default todoRoute;
