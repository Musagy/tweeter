import { Router } from "express";
import * as followCtrl from "../controllers/user.controller";
import { checkJwt } from "../middleware/session";
// import * as authCtrl from "../controllers/auth.controller";

const router = Router();

router.post("/follow", checkJwt, followCtrl.toggleFollow)

export {router};