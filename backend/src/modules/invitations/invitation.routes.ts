import { Router } from "express";
import { InvitationController } from "./invitation.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("invitation:read"), InvitationController.getAll);

router.get("/:id", authorize("invitation:read"), InvitationController.getById);

router.post("/", authorize("invitation:create"), InvitationController.create);

router.put("/:id", authorize("invitation:update"), InvitationController.update);

router.delete("/:id", authorize("invitation:delete"), InvitationController.delete);

export default router;
