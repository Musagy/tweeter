import { PrismaClient } from "@prisma/client"
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
