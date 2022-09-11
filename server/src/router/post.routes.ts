import { Router } from "express"
import * as postCtrl from "../controllers/post.controller"
import { checkJwt } from "../middleware/session"

const router = Router()

router.post("/create", checkJwt, postCtrl.createPost)
router.post("/count/me", checkJwt, postCtrl.countMyPosts)

export { router }
