import { Router } from "express";
import userRoutes from "../modules/users/user.routes.js";
import roleRoutes from "../modules/roles/role.routes.js";
import permissionRoutes from "../modules/permissions/permission.routes.js";
import requestRoutes from "../modules/requests/request.routes.js";
import tagRoutes from "../modules/tags/tag.routes.js";
import forumCategoryRoutes from "../modules/forum-categories/forum-category.routes.js";
import userRoleRoutes from "../modules/userRole/userRole.routes.js";
import rolePermissionRoutes from "../modules/rolePermissions/rolePermission.routes.js";
import invitationRoutes from "../modules/invitations/invitation.routes.js";
import kitComponentRoutes from "../modules/kitComponents/kitComponent.routes.js";
import articleImageRoutes from "../modules/articleImages/articleImage.routes.js";
import stockMovementRoutes from "../modules/stockMovements/stockMovement.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/requests", requestRoutes);
router.use("/tags", tagRoutes);
router.use("/forum-categories", forumCategoryRoutes);
router.use("/user-roles", userRoleRoutes);
router.use("/role-permissions", rolePermissionRoutes);
router.use("/invitations", invitationRoutes);
router.use("/kit-components", kitComponentRoutes);
router.use("/article-images", articleImageRoutes);
router.use("/stock-movements", stockMovementRoutes);

export default router;
