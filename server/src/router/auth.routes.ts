import { Router } from "express"
import * as authCtrl from "../controllers/auth.controller"
import { checkJwt } from "../middleware/session"

const router = Router()

router.post("/signup", authCtrl.signUp)
router.post("/signin", authCtrl.signIn)
router.get("/get-new-token", checkJwt, authCtrl.getToken )

export { router }
