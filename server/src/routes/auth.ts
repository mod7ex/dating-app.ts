import { Router } from "express";
import resourceValidator from "../middlewares/ResourceValidator";
import auth from "../controllers/auth";
import {
      createUserSchema,
      verifyUserSchema,
      forgotPasswordSchema,
      resetPasswordSchema,
} from "../schema/user";

const authRouter = Router();

authRouter.post(
      "/auth/register",
      resourceValidator._$(createUserSchema),
      auth.register
);

authRouter.post(
      "/auth/verify/:id/:verificationCode",
      resourceValidator._$(verifyUserSchema),
      auth.verify
);

authRouter.post(
      "/auth/forgotpassword",
      resourceValidator._$(forgotPasswordSchema),
      auth.forgot_password
);

authRouter.post(
      "/auth/resetpassword/:id/:passwordResetCode",
      resourceValidator._$(resetPasswordSchema),
      auth.reset_password
);

export default authRouter;
