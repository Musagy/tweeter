import { Router } from "express"
import { readdirSync } from "fs"
import { colorizeText } from "../utils/colorizeText"

const PATH_ROUTER = `${__dirname}`
const router = Router()

const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift()
  return file
}
const routes = readdirSync(PATH_ROUTER)

routes.forEach(fileName => {
  const cleanName = cleanFileName(fileName)
  if (cleanName !== "index") {
    import(`./${cleanName}.routes`).then(moduleRouter => {
      if (process.env.NODE_ENV !== "test")
        console.log(
          `se esta cargando la ruta... /${colorizeText(
            cleanName,
            Math.ceil(Math.random() * 6)
          )}`
        )

      router.use(`/${cleanName}`, moduleRouter.router)
    })
  }
})

export { router, routes }
