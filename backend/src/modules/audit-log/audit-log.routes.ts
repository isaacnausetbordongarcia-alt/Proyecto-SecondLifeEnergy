import { Router } from "express";
import { AuditLogController } from "./audit-log.controller.js";

const router = Router();

router.get("/", AuditLogController.getAll);

router.get("/entity/:entity/:entityId", AuditLogController.getByEntity);

router.get("/:id", AuditLogController.getById);

export default router;