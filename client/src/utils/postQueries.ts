import { useToast } from "vue-toastification"
import axios from "axios"
import type { Post, AdditionalContent } from "../types/Model"
import authHandler from "./authHandler"

const toast = useToast()

const { VITE_API } = import.meta.env

export const createPost = async (
  content: string,
  isPublic: boolean,
  image: File | null,
  additionalContent?: AdditionalContent
): Promise<Post | undefined> => {
  // Comprobar si el no hay nada en el post
  const Authorization = <string>localStorage.getItem("token")

  if (!content) {
    toast.warning("Post vació")
    return
  }
  const formData = new FormData()

  if (image !== null) formData.append("image", image)
  formData.append("content", content)
  formData.append("isPublic", isPublic ? "true" : "")
  if (additionalContent)
    Object.keys(additionalContent).forEach((key: string) => {
      if (additionalContent[key])
        formData.append(key, additionalContent[key].toString())
    })

  // Hacer petición
  try {
    const { status, data } = await axios.post(
      VITE_API + "/post/create",
      formData,
      { headers: { Authorization, "Content-Type": "multipart/form-data" } }
    )
    // Si sale un resultado distinto de 200
    if (status !== 200) {
      toast.error(data.response.data.error)
    }
    // si todo sale bien
    toast(data.message)
    return data.post
  } catch (err: any) {
    authHandler(err, () => toast.error(err.response.data.error))
  }
}

export const postsOfFYP = async (
  page: number = 1
): Promise<Post[] | [] | undefined> => {
  try {
    const Authorization = <string>localStorage.getItem("token")
    const newPost = await axios.post(
      VITE_API + "/post/feed?take=10&page=" + page,
      {},
      { headers: { Authorization } }
    )
    return newPost.data.posts
  } catch (err: any) {
    authHandler(err, () => {
      toast.error(err.response.data.error)
      return []
    })
  }
}
export const getTrends = async () => {
  try {
    const { data } = await axios.get(VITE_API + "/post/trends")

    return data.trends
  } catch (err: any) {
    authHandler(err, () => {
      toast.error(err.response.data.error)
      return []
    })
  }
}

export const getPostById = async (postId: number) => {
  try {
    const { data } = await axios.get(VITE_API + "/post/" + postId)

    return data.post
  } catch (err: any) {
    authHandler(err, () => {
      toast.error(err.response.data.error)
      return []
    })
  }
}

export const searchPost = async (
  content: string,
  filter: string,
  page: number = 1
): Promise<Post[] | [] | undefined> => {
  try {
    const { data } = await axios.get(
      VITE_API +
        "/post/search/" +
        content +
        "?filter=" +
        filter +
        "&page=" +
        page
    )
    return data
  } catch (err: any) {
    authHandler(err, () => {
      toast.error(err.response.data.error)
      return null
    })
  }
}
export const bookmarksPost = async (
  filter: "Tweets" | "TweetsNReplies" | "Media" | "Likes",
  page: number = 1
) => {
  const path = {
    Tweets: "/save/get-saved?filter=tweets&",
    TweetsNReplies: "/save/get-saved?filter=tweets-and-replies&",
    Media: "/save/get-saved?filter=media&",
    Likes: "/like/get-liked?",
  }
  const Authorization = <string>localStorage.getItem("token")
  try {
    const { data } = await axios.get(
      VITE_API + path[filter] + "&page=" + page,
      { headers: { Authorization } }
    )
    const postPage = <Post[]>data.map(({ post }: { post: Post }) => post)
    return postPage
  } catch (err: any) {
    authHandler(err, () => {
      toast.error(err.response.data.error)
      return null
    })
  }
}

export const getPostByUserId = async (
  filter: "Tweets" | "TweetsNReplies" | "Media" | "Likes",
  userId: number,
  page: number
): Promise<[] | Post[] | undefined> => {
  const path = {
    Tweets: "filter=tweets",
    TweetsNReplies: "filter=tweets-and-replies",
    Media: "filter=media",
    Likes: "filter=likes",
  }

  const Authorization = <string>localStorage.getItem("token") ?? {}

  try {
    const { data } = await axios.get(
      `${VITE_API}/post/userId/${userId}?${path[filter]}&page=${page}`,
      { headers: { Authorization } }
    )
    return data
  } catch (err: any) {
    authHandler(err, () => {
      toast.error(err.response.data.error)
      return null
    })
  }
}
