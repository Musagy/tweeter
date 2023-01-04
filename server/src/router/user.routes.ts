import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { checkJwt } from "../middleware/session";
// import * as authCtrl from "../controllers/auth.controller";

const router = Router();

router.get("/follow/:user", checkJwt, userCtrl.toggleFollow)
router.get("/is-follower/:userId", checkJwt, userCtrl.isFollower)

router.get("/:id", userCtrl.getUserById)

export {router};