import { RequestHandler } from "express"
import { loginUser, registerNewUser } from "../services/auth"
import { handleHttp } from "../utils/errorHandle"

export const signUp: RequestHandler = async ({ body }, res) => {
  try {
    const responseUser = await registerNewUser(body)
    if (typeof responseUser == "string") res.status(400).send(responseUser)
    return res.status(200).json(responseUser)
  } catch (e) {
    return handleHttp(res, "No se pudo crear la cuenta", e)
  }
}

export const signIn: RequestHandler = async ({ body }, res) => {
  try {
    const { usernameOrEmail, password } = body

    const responseUser = await loginUser({ usernameOrEmail, password })

    if (responseUser === "Usuario o contraseña incorrecta")
      return res.status(403).send(responseUser)

    return res.send(responseUser)
  } catch (e) {
    return handleHttp(res, "No se pudo crear la cuenta", e)
  }
}
