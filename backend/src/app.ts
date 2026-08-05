import { errorHandling } from "./middlewares/error-handling.js";
import { router } from "./routes/index.js";
import express from "express";
import "express-async-error";
import cors from "cors";


const app = express();
const allowedOrigins = process.env.APP_ORIGIN?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins?.length ? allowedOrigins : true }));
app.use(express.json());
app.get("/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});
app.use(router);
app.use(errorHandling);

export { app };
