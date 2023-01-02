import { Ref } from "vue"
import { useToast } from "vue-toastification"
import axios from "axios"
import { Post } from "../types/Model"

const toast = useToast()

const { VITE_API } = import.meta.env

export const createPost = async (
  content: Ref<String>,
  isPublic: Ref<boolean>,
  additionalContent?: {
    parentId?: number
    retweetId?: number
  }
): Promise<Post | undefined> => {
  // Comprobar si el no hay nada en el post
  const Authorization = <string>localStorage.getItem("token")

  if (!content.value) {
    toast.warning("Post vacio")
  }

  // Hacer petición
  try {
    const { status, data } = await axios.post(
      VITE_API + "/post/create",
      { content: content.value, public: isPublic.value, ...additionalContent },
      { headers: { Authorization } }
    )
    // Si sale un resultado distinto de 200
    if (status !== 200) {
      toast.error(data.response.data.error)
    }
    // si todo sale bien
    toast(data.message)
    content.value = ""
    return data.post
  } catch (err: any) {
    toast.error(err.response.data.error)
  }
}

export const postsOfFYP = async (page: number = 1): Promise<Post[] | []> => {
  try {
    const Authorization = <string>localStorage.getItem("token")
    const newPost = await axios.post(
      VITE_API + "/post/feed?take=10&page=" + page,
      {},
      { headers: { Authorization } }
    )

    return newPost.data.posts
  } catch (err: any) {
    toast.error(err.response.data.error)
    return []
  }
}
export const getTrends = async () => {
  try {
    const { data } = await axios.get(VITE_API + "/post/trends")

    return data.trends
  } catch (err: any) {
    toast.error(err.response.data.error)
    return []
  }
}

export const getPostById = async (postId: number) => {
  try {
    const { data } = await axios.get(VITE_API + "/post/" + postId)

    return data.post
  } catch (err: any) {
    toast.error(err.response.data.error)
    return []
  }
}

export const searchPost = async (content: string, filter: string) => {
  try {
    const { data } = await axios.get(
      VITE_API + "/post/search/" + content + "?filter=" + filter
    )
    console.log(data)
    return data
  } catch (err: any) {
    console.log(err)
    toast.error(err.response.data.error)
    return null
  }
}
