import { Router } from "express";
import { resourceValidator, auth, upload } from "../middlewares";
import userController from "../controllers/user";
import { MAX_USER_PHOTOS } from "../config/config";
import { metaSchema } from "../schema/meta";
import {
      verifyUserSchema,
      forgotPasswordSchema,
      resetPasswordSchema,
      updateUserSchema,
} from "../schema/user";

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

userRouter.post(
      "/user/photos",
      auth._$,
      upload._$.array("photos", MAX_USER_PHOTOS),
      userController.uploadPhotos
);

userRouter.delete("/user/photos/:photo", auth._$, userController.delete_photo);

userRouter.patch("/user/photos/:photo", auth._$, userController.set_main_photo);

userRouter.delete("/user/photos", auth._$, userController.delete_all_photos);

userRouter.post("/user/search", auth._$, userController.search_users);

export default userRouter;
