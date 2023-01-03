import { PrismaClient } from "@prisma/client"
import { Prisma } from "@prisma/client"
import { String } from "../interfaces/typeNullable"


const prisma = new PrismaClient()

/**
 * Esto Retorna si un usuario guardo un post por su ID
 */
export const isSaved = async (userId: number, postId: number) => {
  const likedIt = await prisma.saves.findUnique({
    where: { userId_postId: { userId, postId } },
  })

  return !!likedIt
}

/**
 * Función para guarda un post en tus guardados
 */
export const saveAPost = async (userId: number, postId: number) => {
  const newLike = await prisma.saves.create({
    data: { userId, postId },
  })

  return newLike
}

/**
 * Función para quitar el post de tus guardados 
 */
export const unsaveAPost = async (userId: number, postId: number) => {
  const unlikeData = await prisma.saves.delete({
    where: {
      userId_postId: { userId, postId },
    },
  })

  return unlikeData
}

/**
 * Servicio para guardar y quita un post en tus post guardados
 */
export const toggleSave = async (UserId: String, PostId: String) => {
  if (!UserId || !PostId) return "No se pudo hacer la accion por falta de datos"
  const [userId, postId] = [+UserId, +PostId]
  
  const liked = await isSaved(userId, postId)

  switch (liked) {
    case false:
      await saveAPost(userId, postId)
      return `Has guardado el post de Id ${postId}`

    case true:
      await unsaveAPost(userId, postId)
      return `Has quitado el post de Id ${postId} de tus guardados`
  }
}

type Filters = "tweets" | "tweets-and-replies" | "media"

export const getSaved = async (
  userId: number,
  filter: Filters,
  page: number = 1
) => {
  if (!userId || !filter) return "No se pudo hacer la acción por falta de datos"

  const filterWhere: { [e in Filters]: Prisma.SavesFindManyArgs } = {
    tweets: {
      where: {
        post: { parentId: { equals: null } },
      },
    },
    ["tweets-and-replies"]: {
      where: {},
    },
    media: {
      where: {
        // post: { photo: { not: { equals: null } } },
      },
    },
  }
  const searcher = { equals: userId }
  const postPage = await prisma.saves.findMany({
    where: {
      userId: { equals: userId },
      ...filterWhere[filter].where,
    },
    orderBy: { createdAt: "desc" },
    take: 10,
    skip: 10 * (page - 1),
    include: {
      post: {
        include: {
          author: { select: { name: true, username: true, id: true } },
          _count: { select: { replies: true, retweets: true, saves: true } },
          favorites: { where: { userId: searcher } },
          retweets: { where: { authorId: searcher } },
          saves: { where: { userId: searcher } },
          replies: {
            take: 10,
            include: {
              author: { select: { username: true } },
              favorites: { where: { userId: searcher } },
              _count: { select: { favorites: true } },
            },
          },
        },
      },
    },
  })

  return postPage
}
