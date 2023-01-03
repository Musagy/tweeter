import { Router } from "express";
import * as likeCtrl from "../controllers/like.controller";
import { checkJwt } from "../middleware/session";
// import * as authCtrl from "../controllers/auth.controller";

const router = Router();

router.get("/get-liked", checkJwt, likeCtrl.getLiked)
router.get("/create/:post", checkJwt, likeCtrl.toggleLike)

export {router};