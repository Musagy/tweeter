import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

/**
 * Esta función crea tags, y si ya existen este los salteara
 */
const createTags = async (tags: string[]) => {
  // formate los datos para la peticion de prisma para la creacion de tags
  const data = tags.map(id => ({ id }))

  await prisma.tags.createMany({ data, skipDuplicates: true })
}

/**
 * Esta función crea relaciones de tags con un post
 */
const createPostTag = async (tags: string[], postId: number) => {
  // formate los datos para la peticion de prisma para la creacion de las relacion postTags
  const data = tags.map(tagId => ({ tagId, postId }))

  await prisma.postTag.createMany({ data, skipDuplicates: true })
}

/**
 * Servicio total del proceso para crear los tags
 */
export const setPostTags = async (content: string, postId: number) => {
  // Saca todos los tags con su # al inicio
  const rawTags = content.match(/#\w+/g) || []

  // Si en un caso no existe ningun tag se retornara null
  if (rawTags.length === 0) return null

  // Esta sentencia crea la constante tags donde ya no tienen las #
  const tags = rawTags.map(tag => tag.substring(1))

  // Se ejecutan las funciones para crear los tags y los vinculos
  await createTags(tags)
  await createPostTag(tags, postId)

  // y se retorna los tag por si necesitan en el controlador de post
  return tags
}
