import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { extractBasicAuthHeader } from "../../middlewares/basic-auth.middleware.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.post("/login", extractBasicAuthHeader, authorize("auth:login"), AuthController.login);

router.post("/register", extractBasicAuthHeader, authorize("auth:register"), AuthController.register);

export default router;