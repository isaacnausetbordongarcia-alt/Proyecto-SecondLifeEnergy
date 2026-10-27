import { Router } from "express";
import userRoutes from "../modules/users/user.routes.js";
import roleRoutes from "../modules/roles/role.routes.js";
import permissionRoutes from "../modules/permissions/permission.routes.js";
import requestRoutes from "../modules/requests/request.routes.js";
import tagRoutes from "../modules/tags/tag.routes.js";
import forumCategoryRoutes from "../modules/forum-categories/forum-category.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/requests", requestRoutes);
router.use("/tags", tagRoutes);
router.use("/forum-categories", forumCategoryRoutes);

export default router;