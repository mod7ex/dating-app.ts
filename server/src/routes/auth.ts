import { Router } from "express";
import resourceValidator from "../middlewares/ResourceValidator";
import auth from "../controllers/auth";
import {
      createUserSchema,
      verifyUserSchema,
      passwordResetSchema,
} from "../schema/user";

const authRouter = Router();

authRouter.post(
      "/api/auth/register",
      resourceValidator._$(createUserSchema),
      auth.register
);

authRouter.post(
      "/api/auth/verify/:id/:verificationCode",
      resourceValidator._$(verifyUserSchema),
      auth.verify
);

authRouter.post(
      "/api/auth/forgotpassword",
      resourceValidator._$(passwordResetSchema),
      auth.password_reset
);

export default authRouter;
