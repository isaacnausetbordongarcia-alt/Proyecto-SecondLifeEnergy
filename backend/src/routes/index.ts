import { Router } from "express";
import userRoutes from "../modules/users/user.routes.js";
import roleRoutes from "../modules/roles/role.routes.js";
import permissionRoutes from "../modules/permissions/permission.routes.js";
import userRoleRoutes from "../modules/userRole/userRole.routes.js";
import rolePermissionRoutes from "../modules/rolePermissions/rolePermission.routes.js";
import invitationRoutes from "../modules/invitations/invitation.routes.js";
import articleCategoryRoutes from "../modules/article-categories/article-category.routes.js";
import articleRoutes from "../modules/articles/article.routes.js";
import articleImageRoutes from "../modules/article-images/articleImage.routes.js";
import kitComponentRoutes from "../modules/kit-components/kitComponent.routes.js";
import articleReviewRoutes from "../modules/article-reviews/article-review.routes.js";
import stockMovementRoutes from "../modules/stock-movements/stockMovement.routes.js";
import requestRoutes from "../modules/requests/request.routes.js";
import requestItemRoutes from "../modules/request-item/request-item.routes.js";
import resourceRoutes from "../modules/resources/resource.routes.js";
import tagRoutes from "../modules/tags/tag.routes.js";
import resourceTagRoutes from "../modules/resource-tag/resource-tag.routes.js";
import articleResourceRoutes from "../modules/article-resource/article-resource.routes.js";
import simulationRoutes from "../modules/simulations/simulation.routes.js";
import simulationArticleRoutes from "../modules/simulation-articles/simulation-article.routes.js";
import simulationResourceRoutes from "../modules/simulation-resources/simulation-resource.routes.js";
import forumCategoryRoutes from "../modules/forum-categories/forum-category.routes.js";
import questionRoutes from "../modules/questions/question.routes.js";
import answerRoutes from "../modules/answers/answer.routes.js";
import moderationRoutes from "../modules/moderations/moderation.routes.js";
import auditLogRoutes from "../modules/audit-log/audit-log.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/user-roles", userRoleRoutes);
router.use("/role-permissions", rolePermissionRoutes);
router.use("/invitations", invitationRoutes);

router.use("/article-categories", articleCategoryRoutes);
router.use("/articles", articleRoutes);
router.use("/article-images", articleImageRoutes);
router.use("/kit-components", kitComponentRoutes);
router.use("/article-reviews", articleReviewRoutes);
router.use("/stock-movements", stockMovementRoutes);

router.use("/requests", requestRoutes);
router.use("/request-items", requestItemRoutes);

router.use("/resources", resourceRoutes);
router.use("/tags", tagRoutes);

router.use("/simulations", simulationRoutes);
router.use("/simulation-articles", simulationArticleRoutes);
router.use("/simulation-resources", simulationResourceRoutes);

router.use("/forum-categories", forumCategoryRoutes);
router.use("/questions", questionRoutes);
router.use("/answers", answerRoutes);
router.use("/moderations", moderationRoutes);

router.use("/audit-logs", auditLogRoutes);

router.use("/", articleResourceRoutes);
router.use("/", resourceTagRoutes);

export default router;