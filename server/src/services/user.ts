import { PrismaClient } from "@prisma/client"
import { encrypt, verified } from "../utils/bcryptHandle"
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

export const getUserById = async (UserId: String) => {
  if (!UserId) return "No se pudo hacer la accion por falta de datos"
  const userId = +UserId

  return await prisma.users.findUnique({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          following: true,
          followers: true,
        },
      },
    },
  })
}

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  username: string
) => {
  try {
    // Primero buscamos al usuario en la base de datos
    const user = await prisma.users.findUnique({ where: { username } })

    if (!user) return "Usuario no encontrado"

    // Luego comparamos la contraseña actual con la contraseña almacenada en la base de datos
    const isPasswordCorrect = await verified(currentPassword, user.password)

    if (!isPasswordCorrect) return "La contraseña es incorrecta"

    // Si la contraseña es correcta, encriptamos la nueva contraseña y la actualizamos en la base de datos
    const hashedNewPassword = await encrypt(newPassword)

    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedNewPassword,
      },
    })

    return "Contraseña cambiada correctamente"
  } catch (error) {
    console.log(error)
    return "No se pudo cambiar la contraseña"
  }
}

export const changeImages = async ({
  UserId,
  avatar,
  banner,
}: {
  UserId: string
  avatar?: String
  banner?: String
}) => {
  try {
    const userId = +UserId

    const data: { avatar?: string; banner?: string } = {}
    if (avatar) data.avatar = avatar
    if (banner) data.banner = banner

    await prisma.users.update({ where: { id: userId }, data })

    return "Cambio de imagen(es) Completo"
  } catch (error) {
    console.log(error)
    return "No se pudo cambiar la(s) imagen(es)"
  }
}
