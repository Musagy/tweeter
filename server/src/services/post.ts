import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

export const createPost = async (post: Prisma.PostsUncheckedCreateInput) => {
  await prisma.posts.create({
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
  const include: Prisma.PostsInclude = {
    author: {
      select: {
        name: true,
        username: true,
        id: true,
      },
    },
  }

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
  console.log(config)
  const res = await prisma.posts.findMany(config)
  return res
}

export const getPostById = async (userId: string) => {
  const res = await prisma.posts.findUnique({
    where: { id: +userId },
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

export const searchPost = async (search: string, page = 1, take = 1) => {
  const post = await getPostPage({
    where: {
      OR: [
        { content: { contains: search } },
        {
          author: {
            OR: [{ username: search }, { name: search }],
          },
        },
        { createdAt: search },
      ],
    },
    page,
    take,
  })
  return post
}
