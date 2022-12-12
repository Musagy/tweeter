import { Router } from "express";
import * as likeCtrl from "../controllers/like.controller";
import { checkJwt } from "../middleware/session";
// import * as authCtrl from "../controllers/auth.controller";

const router = Router();

router.post("/like", checkJwt, likeCtrl.toggleLike)

export {router};