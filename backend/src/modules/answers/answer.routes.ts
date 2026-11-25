import { Router } from "express";
import { AnswerController } from "./answer.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("answer:read"), AnswerController.getAll);

router.get("/eagerly/:id", authorize("answer:read"), AnswerController.getEagerlyById);

router.get("/:id", authorize("answer:read"), AnswerController.getById);

router.post("/", authorize("answer:create"), AnswerController.create);

router.put("/:id", authorize("answer:update"), AnswerController.update);

router.delete("/:id", authorize("answer:delete"), AnswerController.delete);

export default router;