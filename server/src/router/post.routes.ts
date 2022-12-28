import { Router } from "express"
import * as postCtrl from "../controllers/post.controller"
import { checkJwt } from "../middleware/session"

const router = Router()

router.post("/create", checkJwt, postCtrl.createPost)
router.post("/feed", checkJwt, postCtrl.getFeed)

router.post("/count/me", checkJwt, postCtrl.countMyPosts)

router.get("/userId/:id", postCtrl.getPostsByUserId)
router.get("/:id", postCtrl.getPostById)

router.put("/:id", checkJwt, postCtrl.editPostById)
router.delete("/:id", checkJwt, postCtrl.deletePostById)

router.get("/search/:content", postCtrl.searchPost)

export { router }
