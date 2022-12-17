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
  if (!UserId || !PostId) return "No se pudo hacer la accion por falta de datos"
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
