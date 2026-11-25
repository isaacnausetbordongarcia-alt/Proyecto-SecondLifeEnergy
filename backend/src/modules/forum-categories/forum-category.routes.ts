import { Router } from "express";
import { ForumCategoryController } from "./forum-category.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("forum-category:read"), ForumCategoryController.getAll);

router.get("/:id", authorize("forum-category:read"), ForumCategoryController.getById);

router.post("/", authorize("forum-category:create"), ForumCategoryController.create);

router.put("/:id", authorize("forum-category:update"), ForumCategoryController.update);

router.delete("/:id", authorize("forum-category:delete"), ForumCategoryController.delete);

export default router;