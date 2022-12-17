import { PrismaClient } from "@prisma/client"
import { String } from "../interfaces/typeNullable"

const prisma = new PrismaClient()

/**
 * Esto Retorna si un usuario sigue a alguien por ID
 */
export const isFollower = async (followerId: number, followingId: number) => {
  const isFollowingHim = await prisma.follows.findUnique({
    where: { followerId_followingId: { followerId, followingId } },
  })

  return !!isFollowingHim
}

/**
 * Esto crea un nuevo enlace de seguidor al que quiere seguir
 */
export const followAUser = async (followerId: number, followingId: number) => {
  const newFollowUp = await prisma.follows.create({
    data: { followerId, followingId },
  })

  return newFollowUp
}

/**
 * Esto elimina un enlace de seguiento de un usuario a otro
 */
export const unfollowAUser = async (
  followerId: number,
  followingId: number
) => {
  const unfollowData = await prisma.follows.delete({
    where: { followerId_followingId: { followerId, followingId } },
  })

  return unfollowData
}

/**
 * Servicio para seguir a un usuario o si lo sigues lo dejara de subir
 */
export const toggleFollow = async (FollowerId: String, FollowingId: String) => {
  if (!FollowerId || !FollowingId)
    return "No se pudo hacer la accion por falta de datos"
  const [followerId, followingId] = [+FollowerId, +FollowingId]

  const follower = await isFollower(followerId, followingId)

  switch (follower) {
    case false:
      await followAUser(followerId, followingId)
      return `Ahora sigues al usuario ${followingId}`

    case true:
      await unfollowAUser(followerId, followingId)
      return `Ahora ya no sigues al usuario ${followingId}`
  }
}
