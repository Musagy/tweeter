import { RequestHandler } from "express"
import { String } from "../interfaces/typeNullable"
import * as LikeServices from "../services/like"
import { handleHttp } from "../utils/errorHandle"


export const toggleLike: RequestHandler = async ({ body, params }, res) => {
  try {
    const userId = <String>body["user"]
    const postId = <String>params["post"]

    const newState = await LikeServices.toggleLike(userId, postId)
    if (newState == "No se pudo hacer la accion por falta de datos")
      res.status(400).send(newState)

    res.status(200).send(newState)
  } catch (e) {
    handleHttp(res, "No se pudo cambiar el estado de like", e)
  }
}