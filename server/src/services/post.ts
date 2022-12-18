import { PrismaClient, Prisma } from "@prisma/client"
import { String } from "../interfaces/typeNullable"

const prisma = new PrismaClient()

export const createPost = async (post: Prisma.PostsUncheckedCreateInput) => {
  return await prisma.posts.create({
    data: { ...post },
  })
}
export const getPostsCount = async (authorId: number) => {
  const res = await prisma.posts.count({
    where: {
      authorId,
    },
  })
  return res
}

/**
 * Esta función crea una pagina de posts lista para pintar en pantalla,
 * tambien se le pueden poner cosas como el orden de los posts
 */
export const getPostPage = async ({
  where = {},
  page = 1,
  take = 15,
  orderByExt = { favorites: { _count: "desc" } },
}: {
  orderByExt?: Prisma.PostsOrderByWithRelationInput
  where?: Prisma.PostsWhereInput
  page?: number
  take?: number
}) => {
  const skip = (page - 1) * 15

  // Datos de autor para que vaya en el post
  const include: Prisma.PostsInclude = {
    author: {
      select: {
        name: true,
        username: true,
        id: true,
      },
    },
  }

  // Settear como se ordenaran los posts
  const orderBy: Prisma.Enumerable<Prisma.PostsOrderByWithRelationInput> = [
    orderByExt,
    { createdAt: "desc" },
  ]
  const config = {
    where,
    take,
    include,
    orderBy,
    skip,
  }
  const res = await prisma.posts.findMany(config)
  return res
}

export const getPostById = async (userId: string) => {
  const res = await prisma.posts.findUnique({
    where: { id: +userId },
    include: {
      _count: {
        select: {
          replies: true,
        },
      },
    },
  })
  return res
}

export const editPostById = async ({
  postId,
  userId,
  data,
}: {
  userId: string
  postId: string
  data: Prisma.PostsUpdateManyMutationInput
}) => {
  const isYourPost = await verifyAuthority(postId, `${userId}`)
  if (isYourPost) {
    const res = await prisma.posts.update({
      where: {
        id: +postId,
      },
      data,
    })
    return res
  } else {
    return "No eres el dueño del post"
  }
}

export const verifyAuthority = async (postId: string, userId: string) => {
  const post = await getPostById(postId)
  if (post === null || post?.authorId !== +userId) return false
  return true
}
export const searchPost = async (
  search: string,
  page: String = "1",
  take: String = "15"
) => {
  // Esta constante almacenara los post que retornara getPostPage con los ajustes para el buscador
  const post = await getPostPage({
    where: {
      OR: [
        { content: { contains: search, mode: "insensitive" } },
        {
          author: {
            OR: [
              { username: { contains: search, mode: "insensitive" } },
              { name: { contains: search, mode: "insensitive" } },
            ],
          },
        },
      ],
    },
    page: Number.parseInt(page),
    take: Number.parseInt(take),
  })
  return post
}
