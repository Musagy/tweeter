import { Router } from "express"
import { readdirSync } from "fs"
import { colorizeText, colorFont } from "../utils/colorizeText"

const PATH_ROUTER = `${__dirname}`
const router = Router()

const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift()
  return file
}

// const provide = (c: number, minus: number) => (c - minus) / 5 + 1
// const colorFont = (s: string) => {
//   const charCode = s[0].charCodeAt(0)
//   const result = charCode <= 90 ? provide(charCode, 65) : provide(charCode, 97)
//   if (result > 0 && result < 7) {
//     console.log(`se esta cargando la ruta... /${colorizeText(s, result)}`)
//   }
// }

readdirSync(PATH_ROUTER).forEach(fileName => {
  const cleanName = cleanFileName(fileName)
  if (cleanName !== "index") {
    import(`./${cleanName}.routes`).then(moduleRouter => {
      console.log(
        `se esta cargando la ruta... /${colorizeText(
          cleanName,
          colorFont(`${cleanName}`)
        )}`
      )
      router.use(`/${cleanName}`, moduleRouter.router)
    })
  }
})

export { router }
