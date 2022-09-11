import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

export const createPost = async (post: Prisma.PostsUncheckedCreateInput) => {
  console.log(post)
  const res = await prisma.posts.create({
    data: { ...post },
  })
  console.log(res)
}
export const getPostsCount = async (authorId: number) => {
  const res = await prisma.posts.count({
    where: {
      authorId,
    },
  })
  console.log(res)
  return res
}
export const getPostPage = async ({
  where = {},
  page = 1,
  take = 15,
  orderByExt = { favorites: { _count: "desc" } },
}: {
  orderByExt: Prisma.PostsOrderByWithRelationInput
  where: Prisma.PostsWhereInput
  page: number
  take: number
}) => {
  const skip = page-- * 15
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

  await prisma.posts.findMany({ where, take, skip, include, orderBy })
}
