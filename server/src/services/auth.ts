import { encrypt, verified } from "../utils/bcryptHandle"
import { PrismaClient, Users } from "@prisma/client"
import { generateToken } from "../utils/jwtHandle"

const prisma = new PrismaClient()

export const registerNewUser = async ({ name, username, email, password }: Users) => {
  const emailExists = await prisma.users.findUnique({ where: { email } })
  if (emailExists) return "Email already exists"

  const usernameExists = await prisma.users.findUnique({ where: { username } })
  if (usernameExists) return "Username already exists"

  const passHash = await encrypt(password)
  const newUser = await prisma.users.create({
    data: {
      username,
      name,
      email,
      password: passHash,
    },
  })

  return newUser
}

export const loginUser = async ({
  usernameOrEmail,
  password,
}: {
  usernameOrEmail: string
  password: string
}) => {
  if(!usernameOrEmail || !password) return "user or password incorrect"
  const checkIs = await prisma.users.findMany({
    where: {
      OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    },
  })
  if (checkIs.length == 0) return "user or password incorrect"
  const isCorrect = await verified(password, checkIs[0].password)
  if (!isCorrect) return "user or password incorrect"
  const token = generateToken(checkIs[0].email)
  const data = {
    token: "Bearer " + token,
    user: checkIs[0],
  };
  return data;
}
