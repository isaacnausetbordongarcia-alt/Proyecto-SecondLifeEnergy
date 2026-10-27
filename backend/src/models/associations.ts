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
import { Role } from "../modules/roles/role.model.js";
import { Permission } from "../modules/permissions/permission.model.js";
import { UserRole } from "../modules/userRole/userRole.model.js";
import { RolePermission } from "../modules/rolePermissions/rolePermission.model.js";
import { Invitation } from "../modules/invitations/invitation.model.js";
import { KitComponent } from "../modules/kitComponents/kitComponent.model.js";
import { ArticleImage } from "../modules/articleImages/articleImage.model.js";
import { StockMovement } from "../modules/stockMovements/stockMovement.model.js";

export function defineAssociations() {
    // ---------- (UserRole) ----------
    User.hasMany(UserRole, { foreignKey: "userId", as: "userRoles", onDelete: "CASCADE" });
    UserRole.belongsTo(User, { foreignKey: "userId", as: "user" });
    Role.hasMany(UserRole, { foreignKey: "roleId", as: "userRoles", onDelete: "CASCADE" });
    UserRole.belongsTo(Role, { foreignKey: "roleId", as: "role" });
    User.belongsToMany(Role, { through: UserRole, foreignKey: "userId", otherKey: "roleId", as: "roles" });
    Role.belongsToMany(User, { through: UserRole, foreignKey: "roleId", otherKey: "userId", as: "users" });

    // ---------- (RolePermission) ----------
    Role.hasMany(RolePermission, { foreignKey: "roleId", as: "rolePermissions", onDelete: "CASCADE" });
    RolePermission.belongsTo(Role, { foreignKey: "roleId", as: "role" });
    Permission.hasMany(RolePermission, { foreignKey: "permissionId", as: "rolePermissions", onDelete: "CASCADE" });
    RolePermission.belongsTo(Permission, { foreignKey: "permissionId", as: "permission" });
    Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "roleId", otherKey: "permissionId", as: "permissions" });
    Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permissionId", otherKey: "roleId", as: "roles" });

    // ---------- (Invitation) ----------
    User.hasMany(Invitation, { foreignKey: "invitedById", as: "sentInvitations" });
    Invitation.belongsTo(User, { foreignKey: "invitedById", as: "invitedBy" });
    Role.hasMany(Invitation, { foreignKey: "roleId", as: "invitations" });
    Invitation.belongsTo(Role, { foreignKey: "roleId", as: "role" });

    // ---------- (KitComponent) ----------
    Article.hasMany(KitComponent, { foreignKey: "kitId", as: "kitComponents", onDelete: "CASCADE" });
    KitComponent.belongsTo(Article, { foreignKey: "kitId", as: "kit" });
    Article.hasMany(KitComponent, { foreignKey: "componentId", as: "usedInKits", onDelete: "CASCADE" });
    KitComponent.belongsTo(Article, { foreignKey: "componentId", as: "component" });
    Article.belongsToMany(Article, { through: KitComponent, foreignKey: "kitId", otherKey: "componentId", as: "components" });
    Article.belongsToMany(Article, { through: KitComponent, foreignKey: "componentId", otherKey: "kitId", as: "kits" });

    // ---------- (ArticleImage) ----------
    Article.hasMany(ArticleImage, { foreignKey: "articleId", as: "images", onDelete: "CASCADE" });
    ArticleImage.belongsTo(Article, { foreignKey: "articleId", as: "article" });

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
    // ---------- (StockMovement) ----------
    Article.hasMany(StockMovement, { foreignKey: "articleId", as: "stockMovements" });
    StockMovement.belongsTo(Article, { foreignKey: "articleId", as: "article" });
    User.hasMany(StockMovement, { foreignKey: "userId", as: "stockMovements" });
    StockMovement.belongsTo(User, { foreignKey: "userId", as: "user" });
}
