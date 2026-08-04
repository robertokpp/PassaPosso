import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { database } from "./lib/database.js";

export const app = express();

app.disable("x-powered-by");
app.use(cors({ origin: env.allowedOrigins?.length ? env.allowedOrigins : true }));
app.use(express.json());

app.get("/", (_request, response) => {
  response.json({ name: "app-skeleton-api", status: "running" });
});

app.get("/health", async (_request, response) => {
  try {
    await database.query("SELECT 1");
    response.json({ status: "ok", database: "connected" });
  } catch {
    response.status(503).json({ status: "error", database: "disconnected" });
  }
});

