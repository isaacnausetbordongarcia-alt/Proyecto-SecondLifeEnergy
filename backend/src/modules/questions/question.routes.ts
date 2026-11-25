import { Router } from "express";
import { QuestionController } from "./question.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";


const router = Router();

router.use(bearerAuth);

router.get("/", authorize("question:read"), QuestionController.getAll);

router.get("/eagerly/:id", authorize("question:read"), QuestionController.getEagerlyById);

router.get("/:id", authorize("question:read"), QuestionController.getById);

router.post("/", authorize("question:create"), QuestionController.create);

router.put("/:id", authorize("question:update"), QuestionController.update);

router.delete("/:id", authorize("question:delete"), QuestionController.delete);

export default router;