import { User } from "../modules/users/user.model.js";
import { Article } from "../modules/Article/Article.model.js";
import { Simulation } from "../modules/Simulation/Simulation.model.js";
import { SimulationArticles } from "../modules/SimulationArticle/SimulationArticles.model.js";
import { RequestItem } from "../modules/RequestItem/RequestItem.model.js";
import { Request } from "../modules/requests/request.model.js";

export function defineAssociations() {

    // User - Article association
    User.hasMany(Article, {
        foreignKey: "createdById",
        as: "articles",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    });
    Article.belongsTo(User, {
        foreignKey: "createdById",
        as: "creator",
    });
    // Article - User association end

    // Simulation - Article association
    Simulation.belongsToMany(Article, {
        through: SimulationArticles,
        foreignKey: "simulationId",
        otherKey: "articleId",
        as: "articles",
    });

    Article.belongsToMany(Simulation, {
        through: SimulationArticles,
        foreignKey: "articleId",
        otherKey: "simulationId",
        as: "simulations",
    });
    // Simulation - Article association end

    //request - requestItem association
    Request.hasMany(RequestItem, {
        foreignKey: "requestId",
        as: "items",
        onDelete: "CASCADE",
    });

    RequestItem.belongsTo(Request, {
        foreignKey: "requestId",
        as: "request",
    });

    Article.hasMany(RequestItem, {
        foreignKey: "articleId",
        as: "requestItems",
        onDelete: "RESTRICT",
    });

    RequestItem.belongsTo(Article, {
        foreignKey: "articleId",
        as: "article",
    });
    //request - requestItem association end

}

