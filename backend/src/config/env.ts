const port = Number(process.env.PORT ?? 3333);
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("A variável DATABASE_URL é obrigatória.");
}

export const env = {
  port,
  databaseUrl,
  allowedOrigins: process.env.APP_ORIGIN?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};

