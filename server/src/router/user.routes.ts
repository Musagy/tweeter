import { Router } from "express"
import * as userCtrl from "../controllers/user.controller"
import { checkJwt } from "../middleware/session"
import { uploadMany } from "../middleware/upload"

const router = Router()

router.get("/follow/:user", checkJwt, userCtrl.toggleFollow)
router.get("/is-follower/:userId", checkJwt, userCtrl.isFollower)

router.get("/:id", userCtrl.getUserById)

router.patch("/change-password", userCtrl.changePassword)
router.patch("/change-images", checkJwt, uploadMany, userCtrl.changeImages)

export { router }
