import { Router } from "express";
import { QuestionController } from "./question.controller.js";

const router = Router();

router.get("/", QuestionController.getAll);

router.get("/eagerly/:id", QuestionController.getEagerlyById);

router.get("/:id", QuestionController.getById);

router.post("/", QuestionController.create);

router.put("/:id", QuestionController.update);

router.delete("/:id", QuestionController.delete);

export default router;