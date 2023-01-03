import { PrismaClient } from "@prisma/client"
import { String } from "../interfaces/typeNullable"

const prisma = new PrismaClient()

/**
 * Esto Retorna si un usuario le dio like a un post por su ID
 */
export const isLiked = async (userId: number, postId: number) => {
  const likedIt = await prisma.likes.findUnique({
    where: { userId_postId: { userId, postId } },
  })

  return !!likedIt
}

/**
 * Función para dar like
 */
export const likeAPost = async (userId: number, postId: number) => {
  const newLike = await prisma.likes.create({
    data: { userId, postId },
  })

  return newLike
}

/**
 * Función para quitar like
 */
export const unlikeAPost = async (userId: number, postId: number) => {
  const unlikeData = await prisma.likes.delete({
    where: {
      userId_postId: { userId, postId },
    },
  })

  return unlikeData
}

/**
 * Servicio para dar y quitar like dependiendo de su estado
 */
export const toggleLike = async (UserId: String, PostId: String) => {
  if (!UserId || !PostId) return "No se pudo hacer la acción por falta de datos"
  const [userId, postId] = [+UserId, +PostId]

  const liked = await isLiked(userId, postId)

  switch (liked) {
    case false:
      await likeAPost(userId, postId)
      return `Le diste like al post ${postId}`

    case true:
      await unlikeAPost(userId, postId)
      return `Ya no te gusta el post ${postId}`
  }
}

export const getLiked = async (
  userId: number,
  page: number = 1
) => {
  if (!userId) return "No se pudo hacer la acción por falta de datos"

  const searcher = { equals: userId }
  const postPage = await prisma.saves.findMany({
    where: {
      userId: { equals: userId },
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
