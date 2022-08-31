import express from "express";
import pkg from "../package.json";

const app = express()
app.use(express.json())

app.set("pkg", pkg)
app.get("/", (_, res) => {
  res.json({
    name: pkg.name,
    author: pkg.author,
    description: pkg.description,
    version: pkg.version,
    message: "hola chupapis"
  })
});

export default app