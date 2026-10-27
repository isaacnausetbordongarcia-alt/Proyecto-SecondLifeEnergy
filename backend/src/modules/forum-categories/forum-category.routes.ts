import { Router } from "express";
import { ForumCategoryController } from "./forum-category.controller.js";

const router = Router();

router.get("/", ForumCategoryController.getAll);

router.get("/:id", ForumCategoryController.getById);

router.post("/", ForumCategoryController.create);

router.put("/:id", ForumCategoryController.update);

router.delete("/:id", ForumCategoryController.delete);

export default router;