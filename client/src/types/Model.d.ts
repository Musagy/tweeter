export type User = {
  id: number
  username: string
  email: string
  password: string
  name: string
  createdAt: Date
  role: Role

  avatar: string | null
  banner: string | null
  desc: string | null

  _count: {
    followers: number
    following: number
  }
}
export type Post = {
  id: number
  createdAt: Date
  content: string
  image: string
  public: boolean
  authorId: number
  retweetId: number
  author: {
    username: string
    avatar: string
  }
  tags: { tagId: string }[]
  replies: post[]
  _count: {
    favorites: number
    replies: number
    saves: number
    retweets: number
  }
  favorites: {
    userId: number
  }[]
  retweets: {
    id: number
  }[]
  saves: {
    userId: number
  }[]
  retweeting: Post
}

export type Trends = {
  id: string
  _count: {
    posts: number
  }
}
export interface AdditionalContent {
  parentId?: string
  retweetId?: string
  [key: string]: any
}
