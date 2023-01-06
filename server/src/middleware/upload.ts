import { NextFunction, Request, Response } from "express"
import { uploadImage } from "../controllers/upload.controller"
import * as S3Services from "../services/s3"

export const upload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = await uploadImage(req)

  if (response === null) return next()

  if (typeof response === "string") return res.status(400).json({error: response})

  const image = await S3Services.uploadImage(response)

  if (typeof image === "string") return res.status(400).json({error: image})

  req.body.image = image.url

  return next()
}
