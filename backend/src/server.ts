import { app } from "./app.js";
import { sequelize } from "./config/database.js";
import { env } from "./config/env.js";
import { defineAssociations } from "./models/associations.js";


import "./modules/users/user.model.js";
import "./modules/roles/role.model.js";
import "./modules/permissions/permission.model.js";
import "./modules/requests/request.model.js";
import "./modules/tags/tag.model.js";
import "./modules/forum-categories/forum-category.model.js";
import "./modules/userRole/userRole.model.js";
import "./modules/rolePermissions/rolePermission.model.js";
import "./modules/invitations/invitation.model.js";
import "./modules/kit-components/kitComponent.model.js";
import "./modules/article-images/articleImage.model.js";
import "./modules/stock-movements/stockMovement.model.js";

async function startServer() {
  try {

    defineAssociations();

    await sequelize.authenticate();

    console.log("Connection to MySQL stablished.");

    await sequelize.sync({ force: true }).then(() => {
      console.log(" Data synchronized");
    });

    console.log("Models synchronized.");

    app.listen(env.port, () => {
      console.log(
        `Server working on http://localhost:${env.port}`
      );
    });

  } catch (error) {

    console.error(
      "App could no be started:",
      error
    );

    process.exit(1);
  }
}

startServer();