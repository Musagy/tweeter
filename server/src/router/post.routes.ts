import { Router } from "express"
import * as postCtrl from "../controllers/post.controller"
import { checkJwt } from "../middleware/session"
import { upload } from "../middleware/upload"

const router = Router()

router.post("/create", checkJwt, upload, postCtrl.createPost)
router.post("/feed", checkJwt, postCtrl.getFeed)
router.get("/trends", postCtrl.getTrends)

router.post("/count/me", checkJwt, postCtrl.countMyPosts)

router.get("/search/:content", postCtrl.searchPost)

router.get("/userId/:id", postCtrl.getPostsByUserId)
router.get("/:id", postCtrl.getPostById)

router.put("/:id", checkJwt, postCtrl.editPostById)
router.delete("/:id", checkJwt, postCtrl.deletePostById)

export { router }
