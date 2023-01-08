import { NextFunction, Request, Response } from "express"
import { uploadImage, uploadImages } from "../controllers/upload.controller"
import * as S3Services from "../services/s3"

export const upload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = await uploadImage(req)

  if (response === null) return next()

  if (typeof response === "string")
    return res.status(400).json({ error: response })

  const image = await S3Services.uploadImage(response)

  if (typeof image === "string") return res.status(400).json({ error: image })

  req.body.image = image.url

  return next()
}

export const uploadMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const imagesName = ["avatar", "banner"]

  const images = await uploadImages(req, imagesName)

  if (images.some(image => typeof image === "string")) {
    return res
      .status(400)
      .json({ error: images.find(image => typeof image === "string") })
  }

  const imagesUrl = await Promise.all(
    images.map(async imageFile => {
      if (typeof imageFile === "string" || !imageFile) {
        return null
      }
      const result = await S3Services.uploadImage(imageFile)
      return result
    })
  )

  if (imagesUrl.some(image => typeof image === "string")) {
    return res
      .status(400)
      .json({ error: imagesUrl.find(image => typeof image === "string") })
  }

  imagesName.forEach((imageKey, index) => {
    const e = imagesUrl[index]
    if (typeof e !== "string" && e !== null) req.body[imageKey] = e.url
  })

  return next()
}
