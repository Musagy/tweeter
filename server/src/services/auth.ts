import { encrypt, verified } from "../utils/bcryptHandle"
import { PrismaClient, Users } from "@prisma/client"
import { generateToken } from "../utils/jwtHandle"

const prisma = new PrismaClient()

export const registerNewUser = async ({
  name,
  username,
  email,
  password,
}: Users) => {
  const emailExists = await prisma.users.findUnique({ where: { email } })
  if (emailExists) return "Email en uso"

  const usernameExists = await prisma.users.findUnique({ where: { username } })
  if (usernameExists) return "Username en uso"

  const passHash = await encrypt(`${password}`)
  const newUser = await prisma.users.create({
    data: {
      username,
      name,
      email,
      password: passHash,
    },
  })
  const token = generateToken(`${newUser.id}`)

  return {
    message: "Cuenta creada",
    token: "Bearer " + token,
    user: newUser,
  }
}

export const loginUser = async ({
  usernameOrEmail,
  password,
}: {
  usernameOrEmail: string
  password: string
}) => {
  if (!usernameOrEmail || !password) return "Usuario o contraseña incorrecta"
  const [checkIs] = await prisma.users.findMany({
    where: {
      OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    },
  })
  if (!checkIs) return "Usuario o contraseña incorrecta"

  const isCorrect = await verified(password, checkIs.password)
  if (!isCorrect) return "Usuario o contraseña incorrecta"

  const token = generateToken(`${checkIs.id}`)
  const data = {
    message: "Logeado",
    token: "Bearer " + token,
    user: checkIs,
  }
  return data
}

export const getToken = (userId: string) => {
  return "Bearer " + generateToken(userId)
}
