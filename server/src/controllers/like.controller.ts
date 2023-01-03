import { RequestHandler } from "express"
import { String } from "../interfaces/typeNullable"
import * as LikeServices from "../services/like"
import { handleHttp } from "../utils/errorHandle"

export const toggleLike: RequestHandler = async ({ body, params }, res) => {
  try {
    const userId = <String>body["user"]
    const postId = <String>params["post"]

    const message = await LikeServices.toggleLike(userId, postId)
    if (message == "No se pudo hacer la accion por falta de datos")
      return res.status(400).send(message)

    return res.status(200).json({ message })
  } catch (e) {
    return handleHttp(res, "No se pudo cambiar el estado de like", e)
  }
}

export const getLiked: RequestHandler = async ({ body, query }, res) => {
  try {
    const userId = <String>body["user"] ?? ""
    const page = <String>query["page"] ?? 1

    console.log(userId, userId)

    const postPage = await LikeServices.getLiked(+userId, +page)
    if (typeof postPage === "string") return res.status(400).send(postPage)
    return res.status(200).json(postPage)
  } catch (e) {
    return handleHttp(res, "No se la lista de posts likeados", e)
  }
}
