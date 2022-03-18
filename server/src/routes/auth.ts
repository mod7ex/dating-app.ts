import { Router } from "express";
import authController from "../controllers/auth";
import { createUserSchema, loginUserSchema } from "../schema/user";
import { resourceValidator, auth } from "../middlewares";

const authRouter = Router();

// authRouter.options("/auth/login", function (req, res) {
//       res.setHeader("Access-Control-Allow-Origin", "*");
//       res.setHeader("Access-Control-Allow-Methods", "*");
//       res.setHeader("Access-Control-Allow-Headers", "*");
//       res.end();
// });

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
