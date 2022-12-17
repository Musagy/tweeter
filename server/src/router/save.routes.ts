import { Router } from "express";
import * as saveCtrl from "../controllers/save.controller";
import { checkJwt } from "../middleware/session";
// import * as authCtrl from "../controllers/auth.controller";

const router = Router();

router.post("/:post", checkJwt, saveCtrl.toggleSave)

export {router};