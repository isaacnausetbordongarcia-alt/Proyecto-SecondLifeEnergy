import { Router } from "express";
import { RequestController } from "./request.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("request:read"), RequestController.getAll);

router.get("/:id", authorize("request:read"), RequestController.getById);

router.post("/", authorize("request:create"), RequestController.create);

router.put("/:id", authorize("request:update"), RequestController.update);

router.delete("/:id", authorize("request:delete"), RequestController.delete);

export default router;