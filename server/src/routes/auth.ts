import { Router } from "express";
import resourceValidator from "../middlewares/ResourceValidator";
import auth from "../controllers/auth";
import { createUserSchema } from "../schema/user";

const authRouter = Router();

authRouter.post(
      "/api/auth/register",
      resourceValidator._$(createUserSchema),
      auth.register
);

export default authRouter;
