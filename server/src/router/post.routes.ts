import { Router } from "express"
import * as postCtrl from "../controllers/post.controller"
import { replyComment } from "../middleware/reply"
import { checkJwt } from "../middleware/session"

const router = Router()

router.post("/create", checkJwt, postCtrl.createPost, replyComment)
router.get("/feed", postCtrl.getFeed)

router.post("/count/me", checkJwt, postCtrl.countMyPosts)

router.get("/userId/:id", postCtrl.getPostsByUserId)
router.get("/:id", postCtrl.getPostById)

router.put("/:id", checkJwt, postCtrl.editPostById)

router.get("/search/:content", postCtrl.searchPost)

export { router }
