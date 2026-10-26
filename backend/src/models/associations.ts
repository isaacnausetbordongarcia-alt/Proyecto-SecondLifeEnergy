import { User } from "../modules/users/user.model.js";
import { Role } from "../modules/roles/role.model.js";
import { Permission } from "../modules/permissions/permission.model.js";
import { UserRole } from "../modules/userRole/userRole.model.js";
import { RolePermission } from "../modules/rolePermissions/rolePermission.model.js";
import { Invitation } from "../modules/invitations/invitation.model.js";
import { KitComponent } from "../modules/kitComponents/kitComponent.model.js";
import { ArticleImage } from "../modules/articleImages/articleImage.model.js";
import { StockMovement } from "../modules/stockMovements/stockMovement.model.js";
// Pendiente de unir
import { Article } from "../modules/articles/article.model.js";

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

    // ---------- (StockMovement) ----------
    Article.hasMany(StockMovement, { foreignKey: "articleId", as: "stockMovements" });
    StockMovement.belongsTo(Article, { foreignKey: "articleId", as: "article" });
    User.hasMany(StockMovement, { foreignKey: "userId", as: "stockMovements" });
    StockMovement.belongsTo(User, { foreignKey: "userId", as: "user" });
}
