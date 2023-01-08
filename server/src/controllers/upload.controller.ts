import { Request, RequestHandler } from "express"
import fileUpload from "express-fileupload"
import * as S3Services from "../services/s3"

export const uploadImage = async (req: Request) => {
  if (!req.files) return null
  const image = <fileUpload.UploadedFile>req.files.image
  if (image.truncated) return "Has excedido el limite de peso de imagenes"
  return image
}

export const uploadImageQuery: RequestHandler = async (req, res) => {
  const response = await uploadImage(req)

  if (response === null)
    return res.status(400).send("No se envio ni una imagen")

  if (typeof response === "string") return res.status(400).send(response)

  const image = await S3Services.uploadImage(response)

  if (typeof image === "string") return res.status(400).json(image)

  return res.status(200).json(image)
}

export const uploadImages = async (req: Request, images: string[]) => {
  const imagesFiles = images.map(key => {
    if (!req.files) return null
    const image = <fileUpload.UploadedFile>req.files[key]
    if (image === undefined) return null
    if (image.truncated) return "Has excedido el limite de peso de imagenes"
    return image
  })
  return imagesFiles
}
