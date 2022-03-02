import { Router } from "express";
import { resourceValidator, auth } from "../middlewares";
import userController from "../controllers/user";

import {
      verifyUserSchema,
      forgotPasswordSchema,
      resetPasswordSchema,
} from "../schema/user";

const userRouter = Router();

userRouter.patch(
      "/auth/verify/:id/:verificationCode",
      resourceValidator._$(verifyUserSchema),
      userController.verify
);

userRouter.post(
      "/auth/forgotpassword",
      resourceValidator._$(forgotPasswordSchema),
      userController.forgot_password
);

userRouter.patch(
      "/auth/resetpassword/:id/:passwordResetCode",
      resourceValidator._$(resetPasswordSchema),
      userController.reset_password
);

userRouter.get("/auth/me", auth._$, userController.me);

export default userRouter;
