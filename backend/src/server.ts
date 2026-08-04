import "dotenv/config";
import { app } from "./app.js";
import { env } from "./config/env.js";
import { database } from "./lib/database.js";

const server = app.listen(env.port, () => {
  console.log(`API disponível na porta ${env.port}`);
});

async function shutdown(signal: string) {
  console.log(`${signal} recebido. Encerrando a aplicação...`);
  server.close(async () => {
    await database.end();
    process.exit(0);
  });
}

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));

