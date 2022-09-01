import express from "express"
import pkg from "../package.json"
import router from "./router"

const app = express()
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

console.log(process.env.SALT_ROUNDS)
if (process.env.SALT_ROUNDS !== undefined)
  console.log(parseInt(process.env.SALT_ROUNDS) + 1)

export default app
