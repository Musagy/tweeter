import { sign, verify } from "jsonwebtoken"

import env from "./environment"
const { KEY_SECRET } = env

const generateToken = (id: string) => {
  const jwt = sign({ id }, KEY_SECRET, {
    expiresIn: 86400,
  })
  return jwt
}

const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, KEY_SECRET)
  return isOk
}

export { generateToken, verifyToken }
