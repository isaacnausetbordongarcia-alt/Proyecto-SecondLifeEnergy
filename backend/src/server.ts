import { app } from "./app.js";
import { sequelize } from "./config/database.js";
import { env } from "./config/env.js";
import { defineAssociations } from "./models/associations.js";

async function startServer() {
  try {
   
    defineAssociations();

    await sequelize.authenticate();
    console.log(`Connection to ${env.DB_DIALECT} established (${env.DB_NAME}).`);


    app.listen(env.PORT, () => {
      console.log(`Server working on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("App could not be started:", error);
    process.exit(1);
  }
}

startServer();