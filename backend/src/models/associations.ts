import { User } from "../modules/users/user.model.js";
import { Article } from "../modules/Article/Article.model.js";
import { Simulation } from "../modules/Simulation/Simulation.model.js";
import { SimulationArticles } from "../modules/SimulationArticle/SimulationArticles.model.js";
import { RequestItem } from "../modules/RequestItem/RequestItem.model.js";
import { Request } from "../modules/requests/request.model.js";
import { Resource } from "../modules/Resource/Resource.model.js";
import { ArticleResource } from "../modules/ArticleResource/ArticleResource.model.js";
import { Tag } from "../modules/tags/tag.model.js";
import { ResourceTag } from "../modules/ResourceTag/ResourceTag.model.js";
import { AuditLog } from "../modules/AuditLog/AuditLog.model.js";

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

    // User - Resource association
    User.hasMany(Resource, {
        foreignKey: "authorId",
        as: "resources",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });

    Resource.belongsTo(User, {
        foreignKey: "authorId",
        as: "author",
    });
    // User - Resource association end

    // Article - Resource association
    Article.belongsToMany(Resource, {
        through: ArticleResource,
        foreignKey: "articleId",
        otherKey: "resourceId",
        as: "resources",
    });

    Resource.belongsToMany(Article, {
        through: ArticleResource,
        foreignKey: "resourceId",
        otherKey: "articleId",
        as: "articles",
    });
    // Article - Resource association end

    // Resource - Tag association
    Resource.belongsToMany(Tag, {
        through: ResourceTag,
        foreignKey: "resourceId",
        otherKey: "tagId",
        as: "tags",
    });

    Tag.belongsToMany(Resource, {
        through: ResourceTag,
        foreignKey: "tagId",
        otherKey: "resourceId",
        as: "resources",
    });
    // Resource - Tag association end

    // User - AuditLog association
    User.hasMany(AuditLog, {
        foreignKey: "userId",
        as: "auditLogs",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    });

    AuditLog.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
    });
    // User - AuditLog association end
}