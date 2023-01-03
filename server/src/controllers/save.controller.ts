import { RequestHandler } from "express"
import { String } from "../interfaces/typeNullable"
import * as SaveServices from "../services/save"
import { handleHttp } from "../utils/errorHandle"

export const toggleSave: RequestHandler = async ({ body, params }, res) => {
  try {
    const userId = <String>body["user"]
    const postId = <String>params["post"]

    const message = await SaveServices.toggleSave(userId, postId)
    if (message == "No se pudo hacer la accion por falta de datos")
      res.status(400).send(message)

    res.status(200).json({ message })
  } catch (e) {
    handleHttp(res, "No se pudo cambiar el estado de guardado de posts", e)
  }
}
type Filters = "tweets" | "tweets-and-replies" | "media"

export const getSaved: RequestHandler = async ({ body, query }, res) => {
  try {
    const userId = <String>body["user"] ?? ""
    const filter = <Filters>query["filter"]
    const page = <String>query["page"] ?? 1

    console.log(userId, filter, userId)

    const postPage = await SaveServices.getSaved(+userId, filter, +page)
    if (typeof postPage === "string") res.status(400).send(postPage)
    res.status(200).json(postPage)
  } catch (e) {
    handleHttp(res, "No se la lista de posts salvados", e)
  }
}
