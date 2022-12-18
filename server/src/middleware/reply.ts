import { RequestHandler } from "express"
import * as ReplyServices from "../services/reply"

export const replyComment: RequestHandler = async (req, res) => {
  const { parentId, post } = req.body
  const resReply = await ReplyServices.replyComment(+parentId, +post.id)

  res.status(200).json({
    message: "Respuesta creada",
    post,
    reply: resReply,
  })
}
