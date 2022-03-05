import { Router } from "express";
import { resourceValidator, auth } from "../middlewares";
import userController from "../controllers/user";

import {
      verifyUserSchema,
      forgotPasswordSchema,
      resetPasswordSchema,
      updateUserSchema,
} from "../schema/user";

import { metaSchema } from "../schema/meta";

const userRouter = Router();

userRouter.patch(
      "/user/verify/:id/:verificationCode",
      resourceValidator._$(verifyUserSchema),
      userController.verify
);

userRouter.post(
      "/user/forgotpassword",
      resourceValidator._$(forgotPasswordSchema),
      userController.forgot_password
);

userRouter.patch(
      "/user/resetpassword/:id/:passwordResetCode",
      resourceValidator._$(resetPasswordSchema),
      userController.reset_password
);

userRouter.get("/user/me", auth._$, userController.me);

userRouter.patch(
      "/user/update/meta",
      auth._$,
      resourceValidator._$(metaSchema),
      userController.updateMeta
);

userRouter.patch(
      "/user/update",
      auth._$,
      resourceValidator._$(updateUserSchema),
      userController.updateUser
);

export default userRouter;
