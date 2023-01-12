import { PrismaClient, Prisma } from "@prisma/client"
import { String } from "../interfaces/typeNullable"

const prisma = new PrismaClient()

export const createPost = async (
  post: Prisma.PostsUncheckedCreateInput,
  userId: number
) => {
  return await prisma.posts.create({
    data: { ...post },
    include: {
      author: {
        select: {
          name: true,
          username: true,
          id: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          replies: true,
          retweets: true,
          saves: true,
        },
      },
      favorites: {
        where: {
          userId: {
            equals: userId,
          },
        },
      },
      retweets: {
        where: {
          authorId: {
            equals: userId,
          },
        },
      },
      saves: {
        where: {
          userId: {
            equals: userId,
          },
        },
      },
      replies: {
        take: 3,
        include: {
          author: { select: { username: true } },
          favorites: { where: { userId: { equals: userId } } },
          _count: { select: { favorites: true } },
        },
      },
    },
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

type GetPostPageArgs = {
  orderBy?: Prisma.PostsOrderByWithRelationInput
  where?: Prisma.PostsWhereInput
  page?: number
  take?: number
  searcher?: { equals: number }
}
/**
 * Esta función crea una pagina de posts lista para pintar en pantalla,
 * tambien se le pueden poner cosas como el orden de los posts
 */
export const getPostPage = async ({
  where = {},
  page = 1,
  take = 10,
  orderBy = { favorites: { _count: "desc" } },
  searcher,
}: GetPostPageArgs) => {
  const skip = (page - 1) * take

  // Datos de autor para que vaya en el post
  const include: Prisma.PostsInclude = {
    author: { select: { name: true, username: true, avatar: true } },
    _count: { select: { replies: true, retweets: true, saves: true } },
    favorites: { where: { userId: searcher } },
    retweets: { where: { authorId: searcher } },
    saves: { where: { userId: searcher } },
    replies: {
      take: 3,
      include: {
        author: { select: { username: true, avatar: true } },
        favorites: { where: { userId: searcher } },
        _count: { select: { favorites: true } },
      },
    },
    retweeting: {
      include: {
        author: { select: { name: true, username: true, avatar: true } },
        _count: { select: { replies: true, retweets: true, saves: true } },
        favorites: { where: { userId: searcher } },
        retweets: { where: { authorId: searcher } },
        saves: { where: { userId: searcher } },
        replies: {
          take: 3,
          include: {
            author: { select: { username: true, avatar: true } },
            favorites: { where: { userId: searcher } },
            _count: { select: { favorites: true } },
          },
        },
      },
    },
  }

  // Settear como se ordenaran los posts
  const orderByOption: Prisma.Enumerable<Prisma.PostsOrderByWithRelationInput> =
    [orderBy, { createdAt: "desc" }]
  const config = {
    where,
    take,
    include,
    orderBy: orderByOption,
    skip,
  }

  return await prisma.posts.findMany(config)
}

export const getPostById = async (
  postId: string,
  searcher?: { equals: number }
) => {
  const include = {
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
  }
  const res = await prisma.posts.findUnique({
    where: { id: +postId },
    include,
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

export const deletePostById = async ({
  postId,
  userId,
}: {
  userId: string
  postId: string
}) => {
  const isYourPost = await verifyAuthority(postId, `${userId}`)
  if (isYourPost) {
    await prisma.posts.delete({
      where: {
        id: +postId,
      },
    })
    return "Post Eliminado"
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
  take: String = "10",
  filter: "Top" | "Latest" | "People" | "Media"
) => {
  // Esta constante almacenara los post que retornara getPostPage con los ajustes para el buscador

  interface Filters {
    orderBy?: Prisma.PostsOrderByWithRelationInput
    where?: Prisma.PostsWhereInput
  }
  const filters: { [e in "Top" | "Latest" | "People" | "Media"]: Filters } = {
    Top: {
      orderBy: { favorites: { _count: "desc" } },
      where: { content: { contains: search } },
    },
    Latest: {
      orderBy: { createdAt: "desc" },
      where: { content: { contains: search } },
    },
    People: { where: { author: { username: { contains: search } } } },
    Media: {},
  }
  const filterOption = filters[filter]

  const post = await getPostPage({
    page: Number.parseInt(page),
    take: Number.parseInt(take),
    ...filterOption,
  })
  return post
}

export const getTrends = async () => {
  const trends = await prisma.tags.findMany({
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
    take: 6,
  })

  if (trends.length === 0)
    return { message: "No hay tags para ver las tendencias", trends }

  return { message: "Trends obtenidos", trends }
}
