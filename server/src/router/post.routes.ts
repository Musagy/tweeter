import { Router } from "express"
import * as postCtrl from "../controllers/post.controller"
import { checkJwt } from "../middleware/session"

const router = Router()

router.post("/create", checkJwt, postCtrl.createPost)
router.get("/feed", postCtrl.getFeed)

router.post("/count/me", checkJwt, postCtrl.countMyPosts)

router.post("/userId/:id", postCtrl.getPostsByUserId)
router.post("/:id", postCtrl.getPostById)

router.put("/:id", checkJwt, postCtrl.editPostById)

router.get("/search/:content", postCtrl.searchPost)

export { router }
