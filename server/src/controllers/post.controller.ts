import { Prisma } from "@prisma/client"
import { RequestHandler } from "express"
import * as PostServices from "../services/post"
import { handleHttp } from "../utils/errorHandle"
import { propsToObjs } from "../utils/propsToObjs"
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

export const getFeed: RequestHandler = async (req, res) => {
  try {
    const [page, take] = propsToObjs(req.query, ["page", "take"])
    console.log(page, take)
    const previous = new Date()
    previous.setHours(previous.getHours() - 1)
    const feedConfig: Prisma.PostsWhereInput = {
      createdAt: {
        gte: previous,
      },
    }
    const posts = await PostServices.getPostPage({
      ...page,
      ...take,
      where: feedConfig,
    })
    res.status(200).json(posts)
  } catch (e) {
    handleHttp(res, "No se pudo obtener los posts", e)
  }
}

export const getPostsByUserId: RequestHandler = async (
  { params, query },
  res
) => {
  try {
    const userId = params.id
    const [page, take] = propsToObjs(query, ["page", "take"])
    console.log(page, take, {
      ...page, ...take
    } )
    const posts = await PostServices.getPostPage({
      ...page,
      ...take,
      where: {
        authorId: +userId,
      },
    })
    res.status(200).json(posts)
  } catch (e) {
    handleHttp(res, "No se pudo editar el posts", e)
  }
}

export const getPostById: RequestHandler = async ({ params }, res) => {
  try {
    const postId = params.id
    const post = await PostServices.getPostById(postId)
    res.status(200).json(post)
  } catch (e) {
    handleHttp(res, "No se pudo obtener el posts", e)
  }
}

export const editPostById: RequestHandler = async ({ params, body }, res) => {
  try {
    const postId = params.id
    const [content, user] = propsToObjs(body, ["content", "user"], false)
    const post = await PostServices.editPostById({
      postId,
      data: {
        ...content,
      },
      userId: `${user?.user}`,
    })
    post === "No eres el dueño del post"
      ? res.status(400).send(post)
      : res.status(200).json(post)
  } catch (e) {
    handleHttp(res, "No se pudo editar el posts", e)
  }
}
// export const searchPost: RequestHandler = async ({ query, params }, res) => {
//   const [content, user] = propsToObjs<string>(params, ["content", "user"], false)
//   if (content:)
  
//   const post = await PostServices.searchPost(content.content)
// }
