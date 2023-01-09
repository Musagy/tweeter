import { RequestHandler } from "express"
import * as AuthService from "../services/auth"
import { handleHttp } from "../utils/errorHandle"

export const signUp: RequestHandler = async ({ body }, res) => {
  try {
    const responseUser = await AuthService.registerNewUser(body)
    if (typeof responseUser == "string")
      res.status(400).json({ error: responseUser })
    return res.status(200).json(responseUser)
  } catch (e) {
    return handleHttp(res, "No se pudo crear la cuenta", e)
  }
}

export const signIn: RequestHandler = async ({ body }, res) => {
  try {
    const { usernameOrEmail, password } = body

    const responseUser = await AuthService.loginUser({
      usernameOrEmail,
      password,
    })

    if (responseUser === "Usuario o contraseña incorrecta")
      return res.status(403).send({ error: responseUser })

    return res.send(responseUser)
  } catch (e) {
    return handleHttp(res, "No se pudo logear correctamente", e)
  }
}

export const getToken: RequestHandler = async ({ body }, res) => {
  const userId = body.user
  const newToken = AuthService.getToken(userId)
  res.status(200).json({ newToken })
}
