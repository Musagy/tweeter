import express from "express"
import pkg from "../package.json"
import cors from "cors"
import { router } from "./router"
import fileUpload from "express-fileupload"

// init server
const app = express()

// server config
app.use(
  cors({
    origin: ["http://localhost:3000", "https://tweeter-musagy.vercel.app"],
  })
)
app.use(express.json())
app.use(
  fileUpload({
    limits: { fileSize: 3 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
)

// server router
app.use(router)
app.get("/", (_, res) => {
  res.json({
    name: pkg.name,
    author: pkg.author,
    description: pkg.description,
    version: pkg.version,
    message: "hola chupapis 🤑",
  })
})

export default app
