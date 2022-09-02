import { RequestHandler } from "express"
import { PrismaClient } from "@prisma/client"
import env from "../../src/utils/environment"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()
const { SALT_ROUNDS, KEY_SECRET } = env

export const signUp: RequestHandler = async (req, res) => {
  const { name, username, email, password } = req.body

  const emailExists = await prisma.users.findUnique({ where: { email } })
  const usernameExists = await prisma.users.findUnique({ where: { username } })

  if (emailExists) return res.status(400).send("Email already exists")
  if (usernameExists) return res.status(400).send("Username already exists")

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  const newUser = await prisma.users
    .create({
      data: {
        username,
        name,
        email,
        password: passwordHash,
      },
    })
    .catch(err => {
      return res.status(500).json({ message: err })
    })

  return res.status(200).json({
    message: "Cuenta creada",
    user: newUser,
  })
}

export const signIn: RequestHandler = async (req, res) => {
  const { usernameOrEmail, password } = req.body
  const user = await prisma.users.findMany({
    where: {
      OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    },
    // $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  })
  if (!user) return res.status(400).send("user or password incorrect")
  const passwordConfirm = await bcrypt.compare(password, user[0].password)
  if (passwordConfirm) {
    const token = jwt.sign({ id: user[0].id }, KEY_SECRET, {
      expiresIn: 86400,
    })
    return res.status(200).json({ token: "Bearer " + token })
  } else {
    return res.status(400).send("user or password incorrect")
  }
}
