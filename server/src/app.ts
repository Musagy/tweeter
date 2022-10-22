import express from "express"
import pkg from "../package.json"
import cors from "cors"
import { router } from "./router"

// init server
const app = express()

// server config
app.use(cors())
app.use(express.json())

// server router
app.use(router)
app.get("/", (_, res) => {
  res.json({
    name: pkg.name,
    author: pkg.author,
    description: pkg.description,
    version: pkg.version,
    message: "hola chupapis",
  })
})

export default app
