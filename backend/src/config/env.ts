import dotenv from "dotenv";
import path from "path";

const envFiles: Record<string, string> = {
  development: ".env.develop",
  test: ".env.testing",
  production: ".env.production",
};

const nodeEnv = process.env.NODE_ENV || "development";
const envFile = envFiles[nodeEnv];

if (!envFile) {
  throw new Error(`NODE_ENV no válido: ${nodeEnv}`);
}

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno ${name}`);
  return value;
}

export const env = {
  env: nodeEnv,
  port: Number(process.env.PORT) || 3000,
  db: {
    host: required("DB_HOST"),
    port: Number(process.env.DB_PORT) || 3306,
    name: required("DB_NAME"),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
    logging: process.env.DB_LOGGING === "true",
  },
};
