import { User } from "../modules/users/user.model.js";
import { Article } from "../modules/Article/Article.model.js";
import { Simulation } from "../modules/Simulation/Simulation.model.js";
import { SimulationArticles } from "../modules/SimulationArticle/SimulationArticles.model.js";
import { RequestItem } from "../modules/request-item/request-item.model.js";
import { Request } from "../modules/requests/request.model.js";
import { Resource } from "../modules/Resource/Resource.model.js";
import { ArticleResource } from "../modules/article-resource/article-resource.model.js";
import { Tag } from "../modules/tags/tag.model.js";
import { ResourceTag } from "../modules/resource-tag/resource-tag.model.js";
import { AuditLog } from "../modules/audit-log/audit-log.model.js";
import { ArticleCategory } from "../modules/article-categories/article-category.model.js";
import { ArticleReview } from "../modules/article-reviews/article-review.model.js";
import { Moderation } from "../modules/moderations/moderation.model.js";
import { Question } from "../modules/questions/question.model.js";
import { Answer } from "../modules/answers/answer.model.js";
import { SimulationResource } from "../modules/simulation-resources/simulation-resource.model.js";
import { ForumCategory } from "../modules/forum-categories/forum-category.model.js";
import { Role } from "../modules/roles/role.model.js";
import { Permission } from "../modules/permissions/permission.model.js";
import { UserRole } from "../modules/userRole/userRole.model.js";
import { RolePermission } from "../modules/rolePermissions/rolePermission.model.js";
import { Invitation } from "../modules/invitations/invitation.model.js";
import { KitComponent } from "../modules/kit-components/kitComponent.model.js";
import { ArticleImage } from "../modules/article-images/articleImage.model.js";
import { StockMovement } from "../modules/stock-movements/stockMovement.model.js";

export function defineAssociations() {
    // UserRole
    User.hasMany(UserRole, { foreignKey: "userId", as: "userRoles", onDelete: "CASCADE" });
    UserRole.belongsTo(User, { foreignKey: "userId", as: "user" });
    Role.hasMany(UserRole, { foreignKey: "roleId", as: "userRoles", onDelete: "CASCADE" });
    UserRole.belongsTo(Role, { foreignKey: "roleId", as: "role" });
    User.belongsToMany(Role, { through: UserRole, foreignKey: "userId", otherKey: "roleId", as: "roles" });
    Role.belongsToMany(User, { through: UserRole, foreignKey: "roleId", otherKey: "userId", as: "users" });

    // RolePermission
    Role.hasMany(RolePermission, { foreignKey: "roleId", as: "rolePermissions", onDelete: "CASCADE" });
    RolePermission.belongsTo(Role, { foreignKey: "roleId", as: "role" });
    Permission.hasMany(RolePermission, { foreignKey: "permissionId", as: "rolePermissions", onDelete: "CASCADE" });
    RolePermission.belongsTo(Permission, { foreignKey: "permissionId", as: "permission" });
    Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "roleId", otherKey: "permissionId", as: "permissions" });
    Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permissionId", otherKey: "roleId", as: "roles" });

    // Invitation
    User.hasMany(Invitation, { foreignKey: "invitedById", as: "sentInvitations" });
    Invitation.belongsTo(User, { foreignKey: "invitedById", as: "invitedBy" });
    Role.hasMany(Invitation, { foreignKey: "roleId", as: "invitations" });
    Invitation.belongsTo(Role, { foreignKey: "roleId", as: "role" });

    // KitComponent
    Article.hasMany(KitComponent, { foreignKey: "kitId", as: "kitComponents", onDelete: "CASCADE" });
    KitComponent.belongsTo(Article, { foreignKey: "kitId", as: "kit" });
    Article.hasMany(KitComponent, { foreignKey: "componentId", as: "usedInKits", onDelete: "CASCADE" });
    KitComponent.belongsTo(Article, { foreignKey: "componentId", as: "component" });
    Article.belongsToMany(Article, { through: KitComponent, foreignKey: "kitId", otherKey: "componentId", as: "components" });
    Article.belongsToMany(Article, { through: KitComponent, foreignKey: "componentId", otherKey: "kitId", as: "kits" });

    // ArticleImage
    Article.hasMany(ArticleImage, { foreignKey: "articleId", as: "images", onDelete: "CASCADE" });
    ArticleImage.belongsTo(Article, { foreignKey: "articleId", as: "article" });

    // ArticleCategory
    ArticleCategory.hasMany(Article, { foreignKey: "categoryId", as: "articles" });
    Article.belongsTo(ArticleCategory, { foreignKey: "categoryId", as: "category" });
    ArticleCategory.hasMany(ArticleCategory, { foreignKey: "parentCategoryId", as: "subcategories" });
    ArticleCategory.belongsTo(ArticleCategory, { foreignKey: "parentCategoryId", as: "parentCategory" });

    // ArticleReview
    Article.hasMany(ArticleReview, { foreignKey: "articleId", as: "reviews" });
    ArticleReview.belongsTo(Article, { foreignKey: "articleId", as: "article" });
    User.hasMany(ArticleReview, { foreignKey: "reviewerId", as: "articleReviews" });
    ArticleReview.belongsTo(User, { foreignKey: "reviewerId", as: "reviewer" });

    // Question
    ForumCategory.hasMany(Question, { foreignKey: "categoryId", as: "questions" });
    Question.belongsTo(ForumCategory, { foreignKey: "categoryId", as: "category" });
    User.hasMany(Question, { foreignKey: "authorId", as: "questions" });
    Question.belongsTo(User, { foreignKey: "authorId", as: "author" });

    // Answer
    Question.hasMany(Answer, { foreignKey: "questionId", as: "answers" });
    Answer.belongsTo(Question, { foreignKey: "questionId", as: "question" });
    User.hasMany(Answer, { foreignKey: "authorId", as: "answers" });
    Answer.belongsTo(User, { foreignKey: "authorId", as: "author" });
    Question.belongsTo(Answer, { foreignKey: "acceptedAnswerId", as: "acceptedAnswer" });
    Answer.hasMany(Question, { foreignKey: "acceptedAnswerId", as: "acceptedForQuestions" });

    // Moderation
    User.hasMany(Moderation, { foreignKey: "moderatorId", as: "moderations" });
    Moderation.belongsTo(User, { foreignKey: "moderatorId", as: "moderator" });
    Question.hasMany(Moderation, { foreignKey: "questionId", as: "moderations" });
    Moderation.belongsTo(Question, { foreignKey: "questionId", as: "question" });
    Answer.hasMany(Moderation, { foreignKey: "answerId", as: "moderations" });
    Moderation.belongsTo(Answer, { foreignKey: "answerId", as: "answer" });

    // SimulationResource
    Simulation.belongsToMany(Resource, {
        through: SimulationResource,
        foreignKey: "simulationId",
        otherKey: "resourceId",
        as: "resources"
    });

    Resource.belongsToMany(Simulation, {
        through: SimulationResource,
        foreignKey: "resourceId",
        otherKey: "simulationId",
        as: "simulations"
    });

    Simulation.hasMany(SimulationResource, {
        foreignKey: "simulationId",
        as: "simulationResources"
    });

    SimulationResource.belongsTo(Simulation, {
        foreignKey: "simulationId",
        as: "simulation"
    });

    Resource.hasMany(SimulationResource, {
        foreignKey: "resourceId",
        as: "simulationResources"
    });

    SimulationResource.belongsTo(Resource, {
        foreignKey: "resourceId",
        as: "resource"
    });

    // User - Article
    User.hasMany(Article, {
        foreignKey: "createdById",
        as: "articles",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
    });

    Article.belongsTo(User, {
        foreignKey: "createdById",
        as: "creator"
    });

    // Simulation - Article
    Simulation.belongsToMany(Article, {
        through: SimulationArticles,
        foreignKey: "simulationId",
        otherKey: "articleId",
        as: "articles"
    });

    Article.belongsToMany(Simulation, {
        through: SimulationArticles,
        foreignKey: "articleId",
        otherKey: "simulationId",
        as: "simulations"
    });

    // Request - RequestItem
    Request.hasMany(RequestItem, {
        foreignKey: "requestId",
        as: "items",
        onDelete: "CASCADE"
    });

    RequestItem.belongsTo(Request, {
        foreignKey: "requestId",
        as: "request"
    });

    Article.hasMany(RequestItem, {
        foreignKey: "articleId",
        as: "requestItems",
        onDelete: "RESTRICT"
    });

    RequestItem.belongsTo(Article, {
        foreignKey: "articleId",
        as: "article"
    });

    // User - Resource
    User.hasMany(Resource, {
        foreignKey: "authorId",
        as: "resources",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });

    Resource.belongsTo(User, {
        foreignKey: "authorId",
        as: "author"
    });

    // Article - Resource
    Article.belongsToMany(Resource, {
        through: ArticleResource,
        foreignKey: "articleId",
        otherKey: "resourceId",
        as: "resources"
    });

    Resource.belongsToMany(Article, {
        through: ArticleResource,
        foreignKey: "resourceId",
        otherKey: "articleId",
        as: "articles"
    });

    // Resource - Tag
    Resource.belongsToMany(Tag, {
        through: ResourceTag,
        foreignKey: "resourceId",
        otherKey: "tagId",
        as: "tags"
    });

    Tag.belongsToMany(Resource, {
        through: ResourceTag,
        foreignKey: "tagId",
        otherKey: "resourceId",
        as: "resources"
    });

    // User - AuditLog
    User.hasMany(AuditLog, {
        foreignKey: "userId",
        as: "auditLogs",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
    });

    AuditLog.belongsTo(User, {
        foreignKey: "userId",
        as: "user"
    });

    // StockMovement
    Article.hasMany(StockMovement, { foreignKey: "articleId", as: "stockMovements" });
    StockMovement.belongsTo(Article, { foreignKey: "articleId", as: "article" });
    User.hasMany(StockMovement, { foreignKey: "userId", as: "stockMovements" });
    StockMovement.belongsTo(User, { foreignKey: "userId", as: "user" });
}
