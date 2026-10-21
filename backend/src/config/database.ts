import { Sequelize } from "sequelize";
import { config } from "./env.js";

export const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: "mysql",
    logging: config.db.logging ? console.log : false,
  }
);