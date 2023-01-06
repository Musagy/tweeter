import { Prisma } from "@prisma/client"
import { RequestHandler } from "express"
import { String } from "../interfaces/typeNullable"
import * as PostServices from "../services/post"
import { handleHttp } from "../utils/errorHandle"
import { propsToObjs } from "../utils/propsToObjs"
import * as LikeServices from "../services/like"
import * as TagServices from "../services/tag"

/**
 * Esta funcion creara un post el servicio de post
 */
export const createPost: RequestHandler = async ({ body }, res) => {
  try {
    const authorId = +body.user
    const [retweet, reply, isPublic] = propsToObjs(body, [
      "retweetId",
      "parentId",
      "public",
    ])

    let post: any = await PostServices.createPost(
      {
        authorId,
        content: body.content,
        ...retweet,
        ...reply,
        image: body?.image,
        public: Boolean(isPublic?.public),
      },
      authorId
    )

    // Si responde un string es porque le mando el texto de error
    if (typeof post == "string") return res.status(400).send(post)

    // setea los tags
    await TagServices.setPostTags(body.content, post.id)

    // returna las respuesta normal
    return res.status(200).json({
      message: "Post creado",
      post: { ...post },
    })
  } catch (e) {
    return handleHttp(res, "No se pudo crear el post", e)
  }
}

/**
 * Este controlador va a pasar el numero de posts que tiene un usuario
 */
export const countMyPosts: RequestHandler = async ({ body }, res) => {
  try {
    const authorId = +body.user
    const resCount = await PostServices.getPostsCount(authorId)
    return res.status(200).json({ count: resCount })
  } catch (e) {
    return handleHttp(res, "No se pudo obtener tu numero de post", e)
  }
}

/**
 * Controlador que retornara una lista de post destacados
 */
export const getFeed: RequestHandler = async ({ query, body }, res) => {
  try {
    const [page, take] = propsToObjs(query, ["page", "take"])
    const userId = +body.user

    // includes necesarios para la info de las interacciones que tuvo el usuario con los posts

    const searcher = { equals: +userId }

    // Esta parte de codigo determinara una fecha de los posts mas destacados la ultima hora
    const previous = new Date()
    const gte = new Date(previous.setMonth(previous.getMonth() - 1))
    const feedConfig: Prisma.PostsWhereInput = {
      createdAt: {
        gte,
      },
    }
    const posts = await PostServices.getPostPage({
      ...page,
      ...take,
      where: feedConfig,
      searcher,
    })
    return res
      .status(200)
      .json({ message: `Pagina ${page?.page} de feed`, posts })
  } catch (e) {
    return handleHttp(res, "No se pudo obtener los posts", e)
  }
}

type Filters = "tweets" | "tweets-and-replies" | "media"
/**
 * Controlador que retornara la lista de todos los posts de un usuario
 */
export const getPostsByUserId: RequestHandler = async (
  { params, query },
  res
) => {
  try {
    const userId = params.id
    const [page, take] = propsToObjs<number>(query, ["page", "take"])
    const filter = <Filters | "likes">query["filter"]

    const filters: { [e in Filters]: Prisma.PostsWhereInput } = {
      tweets: {
        authorId: +userId,
        parentId: { equals: null },
      },
      "tweets-and-replies": { authorId: +userId },
      media: {
        authorId: +userId,
        image: { not: { equals: null } },
      },
    }
    if (filter !== "likes") {
      const posts = await PostServices.getPostPage({
        ...page,
        ...take,
        where: {
          ...filters[filter],
        },
      })
      return res.status(200).json(posts)
    } else {
      const saved = await LikeServices.getLiked(+userId, page?.page ?? 1)
      if (typeof saved === "string") return res.status(400).send(saved)
      const posts = saved.map(({ post }) => post)
      return res.status(200).json(posts)
    }
  } catch (e) {
    return handleHttp(res, "No se pudo editar el posts", e)
  }
}

/**
 * Controllador que devuelve un post por su id
 */
export const getPostById: RequestHandler = async ({ params }, res) => {
  try {
    const postId = params.id
    const post = await PostServices.getPostById(postId)
    return res
      .status(200)
      .json({ message: `Post de Id ${postId} obtenido`, post })
  } catch (e) {
    return handleHttp(res, "No se pudo obtener el posts", e)
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
    return post === "No eres el dueño del post"
      ? res.status(400).send(post)
      : res.status(200).json(post)
  } catch (e) {
    return handleHttp(res, "No se pudo editar el posts", e)
  }
}
export const deletePostById: RequestHandler = async ({ params, body }, res) => {
  try {
    const postId = params.id
    const [user] = propsToObjs(body, ["user"], false)
    const message = await PostServices.deletePostById({
      postId,
      userId: `${user?.user}`,
    })
    return message === "No eres el dueño del post"
      ? res.status(400).send(message)
      : res.status(200).json({ message })
  } catch (e) {
    return handleHttp(res, "No se pudo editar el posts", e)
  }
}

export const searchPost: RequestHandler = async ({ query, params }, res) => {
  try {
    const content = params.content

    let [take, page]: Array<String> = [undefined, undefined, "Top"]
    if (query?.take) page = <string>query.take
    if (query?.page) page = <string>query.page

    let filter: "Top" | "Lastest" | "People" | "Media" =
      <"Top" | "Lastest" | "People" | "Media">query.filter ?? "Top"

    if (!(content || take || page)) return res.status(200).json([])

    const post = await PostServices.searchPost(content, page, take, filter)

    return res.status(200).json(post)
  } catch (e) {
    return handleHttp(
      res,
      "Ha ocurrido un error en el servidor al buscar esto",
      e
    )
  }
}

export const getTrends: RequestHandler = async (_req, res) => {
  try {
    const trends = await PostServices.getTrends()

    return res.status(200).json(trends)
  } catch (e) {
    return handleHttp(
      res,
      "Ha ocurrido un error en el servidor al buscar trends",
      e
    )
  }
}
