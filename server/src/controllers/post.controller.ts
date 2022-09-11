import { RequestHandler } from "express"
import * as PostServices from "../services/post"
import { handleHttp } from "../utils/errorHandle"
// import { RequestExt } from "../interfaces/req-ext";

export const createPost: RequestHandler = async (req, res) => {
  try {
    const authorId = +req.body.user
    const resPost = await PostServices.createPost({
      authorId,
      content: req.body.content,
    })
    if (typeof resPost == "string") res.status(400).send(resPost)
    res.status(200).json({
      message: "Post creado",
      post: resPost,
    })
  } catch (e) {
    handleHttp(res, "No se pudo crear el post", e)
  }
}
export const countMyPosts: RequestHandler = async (req, res) => {
  try {
    const authorId = +req.body.user
    const resCount = await PostServices.getPostsCount(authorId)
    res.status(200).json({ count: resCount })
  } catch (e) {
    handleHttp(res, "No se pudo obtener tu numero de post", e)
  }
}

export const getFeet: RequestHandler = async (req, res) => {
  try {
    const authorId = +req.body.user
    const resCount = await PostServices.getPostsCount(authorId)
    res.status(200).json({ count: resCount })
  } catch (e) {
    handleHttp(res, "No se pudo obtener tu numero de post", e)
  }
}
