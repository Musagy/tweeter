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

    if (userData === null) return res.status(400).send("El usuario no existe")

    return res.status(200).json(userData)
  } catch (e) {
    return handleHttp(res, "No se pudo cambiar el estado de seguimiento", e)
  }
}

export const isFollower: RequestHandler = async ({ params, body }, res) => {
  try {
    const followerId = <String>body["user"] ?? 0
    const followingId = <String>params["user"] ?? 0

    if (!followerId || !followingId)
      return res.status(400).send("No se pudo comprobar por falta de datos")
    const isFollowingHim = await UserServices.isFollower(
      +followerId,
      +followingId
    )

    return res.status(200).json({ isFollower: isFollowingHim })
  } catch (e) {
    return handleHttp(res, "No se pudo comprobar su estado del usuario", e)
  }
}

export const changePassword: RequestHandler = async ({ body }, res) => {
  const { currentPassword, newPassword, username } = body

  try {
    const message = await UserServices.changePassword(
      currentPassword,
      newPassword,
      username
    )

    if (message !== "Contraseña cambiada correctamente")
      return res.status(401).json({ error: message })

    return res.status(200).json({ message })
  } catch (e) {
    return handleHttp(res, "No se pudo cambiar la contraseña", e)
  }
}
export const updateUser: RequestHandler = async ({ body }, res) => {
  const { avatar, banner, desc } = body
  try {
    const message = await UserServices.updateUser({
      avatar: avatar,
      banner: banner,
      desc: desc,
      UserId: body["user"],
    })
    res.status(200).json({ message, imageUpdate: { avatar, banner } })
  } catch (e) {
    return handleHttp(res, "No se pudo cambiar la(s) imagen(es)", e)
  }
}
