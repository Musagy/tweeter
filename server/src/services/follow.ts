import { PrismaClient } from "@prisma/client"
import { String } from "../interfaces/typeNullable"

const prisma = new PrismaClient()

/**
 * Esto Retorna si un usuario sigue a alguien por ID
 */
export const isFollower = async (followerId: string, followingId: string) => {
  const isFollowingHim = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: +followerId,
        followingId: +followingId,
      },
    },
  })

  return !!isFollowingHim
}

/**
 * Esto crea un nuevo enlace de seguidor al que quiere seguir
 */
export const followAUser = async (followerId: string, followingId: string) => {
  const newFollowUp = await prisma.follows.create({
    data: { followerId: +followerId, followingId: +followingId },
  })

  return newFollowUp
}

/**
 * Esto elimina un enlace de seguiento de un usuario a otro
 */
export const unfollowAUser = async (
  followerId: string,
  followingId: string
) => {
  const unfollowData = await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: +followerId,
        followingId: +followingId,
      },
    },
  })

  return unfollowData
}

export const toggleFollow = async (followerId: String, followingId: String) => {
  if (!followerId || !followingId)
    return "No se pudo hacer la accion por falta de datos"

  const isFollow = await isFollower(followerId, followingId)

  switch (isFollow) {
    case false:
      await followAUser(followerId, followingId)
      return `Ahora siques al usuario ${followingId}`

    case true:
      await unfollowAUser(followerId, followingId)
      return `Ahora ya no siques al usuario ${followingId}`
  }
}
