import { PrismaClient } from "@prisma/client"
import express from "express"
import pkg from "../package.json"
import router from "./router"

const app = express()
const prisma = new PrismaClient()
app.use(express.json())

// index Api
app.set("pkg", pkg)
app.get("/", (_, res) => {
  res.json({
    name: pkg.name,
    author: pkg.author,
    description: pkg.description,
    version: pkg.version,
    message: "hola chupapis",
  })
})

// routing
app.use("/user", router.authRouter);
app.get("/test",async (_req, res) => {
  const users = await prisma.users.findMany({
    take: 3
  })
  return res.status(200).json(users)
})

export default app
