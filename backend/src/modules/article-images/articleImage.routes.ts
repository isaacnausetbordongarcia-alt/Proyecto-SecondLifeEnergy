import { Router } from "express";
import { ArticleImageController } from "./articleImage.controller.js";

const router = Router();

router.get("/", ArticleImageController.getAll);

router.get("/:id", ArticleImageController.getById);

router.post("/", ArticleImageController.create);

router.put("/:id", ArticleImageController.update);

router.delete("/:id", ArticleImageController.delete);

export default router;
