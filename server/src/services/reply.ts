import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

/**
 * Esto crea un nuevo enlace de seguidor al que quiere seguir
 */
export const replyComment = async (parentId: number, replyId: number) => {
  const replyInfo = await prisma.replies.create({
    data: { parentId, replyId },
  })

  return replyInfo
}

/**
 * Esto elimina un enlace de seguiento de un usuario a otro
 */
export const deleteReply = async (replyId: number) => {
  const replyInfo = await prisma.replies.delete({
    where: { replyId },
  })

  return replyInfo
}