import { Router } from "express";
import { ExamAuditController } from "./examaudit.controller.js";

const router = Router();

router.get("/", ExamAuditController.getAll);
router.get("/operation/create", ExamAuditController.getOperationCreate);
router.get("/eagerly/:id", ExamAuditController.getEagerlyById);
router.get("/:id", ExamAuditController.getById);
router.post("/", ExamAuditController.create);
router.put("/:id", ExamAuditController.update);
router.delete("/:id", ExamAuditController.delete);

export default router;