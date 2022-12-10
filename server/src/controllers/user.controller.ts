import { RequestHandler } from "express"
import { String } from "../interfaces/typeNullable"
import * as FollowServices from "../services/follow"
import { handleHttp } from "../utils/errorHandle"

/**
 * Esta funcion es un toggle cuando el usuario sigue a alguien lo ya no lo seguira, y si no lo sigue lo reguira
 */
export const toggleFollow: RequestHandler = async ({ body }, res) => {
  try {
    // const followerId = <String>body["followerId"]
    const followerId = <String>body["user"]
    const followingId = <String>body["followTo"]

    const newState = await FollowServices.toggleFollow(followerId, followingId)
    if (newState == "No se pudo hacer la accion por falta de datos")
      res.status(400).send(newState)

    res.status(200).send(newState)
  } catch (e) {
    handleHttp(res, "No se pudo cambiar el estado de seguimiento", e)
  }
}
