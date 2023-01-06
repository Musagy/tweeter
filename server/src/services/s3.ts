import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import fileUpload from "express-fileupload"
import fs from "fs"
import util from "util"

const deleteFile = util.promisify(fs.unlink)

const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_IAM_PUBLIC, AWS_IAM_SECRET } =
  process.env
const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_IAM_PUBLIC ?? "",
    secretAccessKey: AWS_IAM_SECRET ?? "",
  },
})

export const getImageUrl = async (filename: string) => {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
  })
  return await getSignedUrl(client, command, { expiresIn: 10000 })
}

export const uploadImage = async (file: fileUpload.UploadedFile) => {
  const stream = fs.createReadStream(file.tempFilePath)
  const ext = file.mimetype.split("/").pop()

  const Key = `${Date.now()}.${ext}`

  const command = new PutObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key,
    Body: stream,
  })
  try {
    await client.send(command)
    await deleteFile(file.tempFilePath)

    return {
      url: `https://s3.${AWS_BUCKET_REGION}.amazonaws.com/${AWS_BUCKET_NAME}/${Key}`,
    }
  } catch (error: any) {
    if (typeof error?.message == "string") return "El bucket no existe"
    return "No se pudo conectar con el client de aws"
  }
}
