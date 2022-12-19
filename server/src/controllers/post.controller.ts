import { Prisma } from "@prisma/client"
import { RequestHandler } from "express"
import { String } from "../interfaces/typeNullable"
import * as PostServices from "../services/post"
import { handleHttp } from "../utils/errorHandle"
import { propsToObjs } from "../utils/propsToObjs"
import { NextFunction, Request, Response } from "express"
import * as TagServices from "../services/tag"

/**
 * Esta funcion creara un post el servicio de post
 */
export const createPost = async (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorId = +body.user

    let post: any = await PostServices.createPost({
      authorId,
      content: body.content,
    })

    // Si responde un string es porque le mando el texto de error
    if (typeof post == "string") res.status(400).send(post)

    // setea los tags
    const tags = await TagServices.setPostTags(body.content, post.id)
    if (tags !== null) post = await PostServices.getPostById(`${post.id}`)

    // se ejecuta si es una respuesta a un post
    if (body.parentId) {
      body.post = post
      return next()
    }

    // returna las respuesta normal
    return res.status(200).json({
      message: "Post creado",
      post: { ...post },
    })
  } catch (e) {
    handleHttp(res, "No se pudo crear el post", e)
  }
}

/**
 * Este controlador va a pasar el numero de posts que tiene un usuario
 */
export const countMyPosts: RequestHandler = async ({ body }, res) => {
  try {
    const authorId = +body.user
    const resCount = await PostServices.getPostsCount(authorId)
    res.status(200).json({ count: resCount })
  } catch (e) {
    handleHttp(res, "No se pudo obtener tu numero de post", e)
  }
}

/**
 * Controlador que retornara una lista de post destacados
 */
export const getFeed: RequestHandler = async ({ query }, res) => {
  try {
    const [page, take] = propsToObjs(query, ["page", "take"])

    // Esta parte de codigo determinara una fecha de los posts mas destacados la ultima hora
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

/**
 * Controlador que retornara la lista de todos los posts de un usuario
 */
export const getPostsByUserId: RequestHandler = async (
  { params, query },
  res
) => {
  try {
    const userId = params.id
    const [page, take] = propsToObjs(query, ["page", "take"])

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

/**
 * Controllador que devuelve un post por su id
 */
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

export const searchPost: RequestHandler = async ({ query, params }, res) => {
  try {
    const content = params.content
    // const take = query.take
    // const page = query.page
    let [take, page]: Array<String> = [undefined, undefined]
    if (query?.take) page = <string>query.take
    if (query?.page) page = <string>query.page
    console.log(take, page)

    if (!(content || take || page)) res.status(200).json([])

    const post = await PostServices.searchPost(content, page, take)

    res.status(200).json(post)
  } catch (e) {
    handleHttp(res, "Ha ocurrido un error en el servidor al buscar esto", e)
  }
}
