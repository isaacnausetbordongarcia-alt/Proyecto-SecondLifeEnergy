import { Router } from "express";
import { AnswerController } from "./answer.controller.js";

const router = Router();

router.get("/", AnswerController.getAll);

router.get("/eagerly/:id", AnswerController.getEagerlyById);

router.get("/:id", AnswerController.getById);

router.post("/", AnswerController.create);

router.put("/:id", AnswerController.update);

router.delete("/:id", AnswerController.delete);

export default router;