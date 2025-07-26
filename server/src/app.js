import "dotenv/config";
import express from "express";
import cors from "cors";
import todoRoute from "./routes/todo.routes.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

// todo route
app.use("/", todoRoute);

export default app;
