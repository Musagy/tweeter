import { Router } from "express";
import * as uploadCtrl from "../controllers/upload.controller";

const router = Router();

router.post("/", uploadCtrl.uploadImageQuery)

export {router};