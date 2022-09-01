import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signup", authCtrl.signUp);
authRouter.post("/signin", authCtrl.signIn);

export default authRouter;