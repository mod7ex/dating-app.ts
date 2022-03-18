import { Router } from "express";
import authController from "../controllers/auth";
import { createUserSchema, loginUserSchema } from "../schema/user";
import { resourceValidator, auth } from "../middlewares";

const authRouter = Router();

authRouter.post(
      "/auth/login",
      resourceValidator._$(loginUserSchema),
      authController.login
);

authRouter.post(
      "/auth/register",
      resourceValidator._$(createUserSchema),
      authController.register
);

authRouter.delete("/auth/logout", auth._$, authController.logout);

authRouter.patch("/auth/refresh", authController.refreshAccessToken);

export default authRouter;
