import { RequestHandler } from "express"
import { String } from "../interfaces/typeNullable"
import * as FollowServices from "../services/follow"
import { handleHttp } from "../utils/errorHandle"

/**
 * Esta funcion es un toggle cuando el usuario sigue a alguien lo ya no lo seguira, y si no lo sigue lo reguira
 */
export const toggleFollow: RequestHandler = async ({ body, params }, res) => {
  try {
    // const followerId = <String>body["followerId"]
    const followerId = <String>body["user"]
    const followingId = <String>params["user"]

    const message = await FollowServices.toggleFollow(followerId, followingId)
    if (message == "No se pudo hacer la accion por falta de datos")
      res.status(400).send(message)

    res.status(200).json({message})
  } catch (e) {
    handleHttp(res, "No se pudo cambiar el estado de seguimiento", e)
  }
}
