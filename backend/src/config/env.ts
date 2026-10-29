import dotenv from "dotenv";
const NODE_ENV =
  process.env.NODE_ENV ?? "development";
if (!["development", "test", "production"].includes(NODE_ENV)) {
  throw new Error(`Entorno no válido: ${NODE_ENV}`);
}
if (NODE_ENV !== "production") {
  dotenv.config({
    path: `.env.${NODE_ENV}`,
  });
}

export const env = {
  PORT: Number(process.env.PORT) || 3000,

  DB_DIALECT: process.env.DB_DIALECT || "postgres",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_NAME: process.env.DB_NAME || "secondlifeenergy",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "1234",
  NODE_ENV
};
