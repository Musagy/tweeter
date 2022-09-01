import { RequestHandler } from "express";
// import { PrismaClient } from "@prisma/client"
// import bcrypt from "bcryptjs";
// import { KEY_SECRET, SALT_ROUNDS } from "../config";

// const prisma = new PrismaClient()

export const signUp: RequestHandler = async (_req, res) => {
  // const {email, username, password} = req.body
  // const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // const response = await prisma.users.create({
  //   data: {
  //     email,
  //     id: username,
  //     password,
  //   }
  // })

  return res.status(200).json({message: "Cuenta creada"})
}

export const signIn: RequestHandler = async (_req, _res) => {
  
}