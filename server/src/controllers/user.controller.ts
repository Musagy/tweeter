import { RequestHandler } from "express"
import { String } from "../interfaces/typeNullable"
import * as UserServices from "../services/user"
import { handleHttp } from "../utils/errorHandle"

/**
 * Esta funcion es un toggle cuando el usuario sigue a alguien lo ya no lo seguira, y si no lo sigue lo reguira
 */
export const toggleFollow: RequestHandler = async ({ body, params }, res) => {
  try {
    // const followerId = <String>body["followerId"]
    const followerId = <String>body["user"]
    const followingId = <String>params["user"]

    const message = await UserServices.toggleFollow(followerId, followingId)
    if (message == "No se pudo hacer la accion por falta de datos")
      return res.status(400).send(message)

    return res.status(200).json({ message })
  } catch (e) {
    return handleHttp(res, "No se pudo cambiar el estado de seguimiento", e)
  }
}

export const getUserById: RequestHandler = async ({ params }, res) => {
  try {
    const userId = <String>params["id"]
    const userData = await UserServices.getUserById(userId)
    console.log(userData)

    if (userData === null) return res.status(400).send("El usuario no existe")

    return res.status(200).json(userData)
  } catch (e) {
    return handleHttp(res, "No se pudo cambiar el estado de seguimiento", e)
  }
}
