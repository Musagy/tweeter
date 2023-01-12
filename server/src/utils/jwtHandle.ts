import { sign, verify } from "jsonwebtoken"

const KEY_SECRET = process.env.KEY_SECRET ?? ""

const generateToken = (id: string) => {
  const jwt = sign({ id }, KEY_SECRET, {
    expiresIn: 259200,
  })
  return jwt
}

const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, KEY_SECRET)
  return isOk
}

export { generateToken, verifyToken }
