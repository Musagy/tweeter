import { RequestHandler } from "express"
import { loginUser, registerNewUser } from "../services/auth"
import { handleHttp } from "../utils/errorHandle"


export const signUp: RequestHandler = async ({ body }, res) => {
  try {
    const responseUser = await registerNewUser(body)
    if (
      responseUser === "Email already exists" ||
      responseUser === "Username already exists"
    )
      res.status(400).send(responseUser)
    res.status(200).json({
      message: "Cuenta creada",
      user: responseUser,
    })
  } catch (e) {
    handleHttp(res, "", e)
  }
}

export const signIn: RequestHandler = async ({ body }, res) => {
  const { usernameOrEmail, password } = body
  const responseUser = await loginUser({ usernameOrEmail, password });
  if (responseUser === "user or password incorrect") {
    res.status(403);
    res.send(responseUser);
    // res.send({ message: responseUser })
  } else {
    res.send(responseUser);
  }
}