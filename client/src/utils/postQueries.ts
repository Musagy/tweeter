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
) => {
  // Comprobar si el no hay nada en el post
  const Authorization = <string>localStorage.getItem("token")

  if (!content.value) return toast.warning("Post vacio")

  // Hacer petición
  try {
    const { status, data } = await axios.post(
      VITE_API + "/post/create",
      { content: content.value, public: isPublic.value, ...additionalContent },
      { headers: { Authorization } }
    )
    // Si sale un resultado distinto de 200
    if (status !== 200) return toast.error(data.response.data.error)
    // si todo sale bien
    toast(data.message)
    console.log(data)
    content.value = ""
  } catch (err: any) {
    toast.error(err.response.data.error)
  }
}

export const postsOfFYP = async (page: number = 1): Promise<Post[] | []> => {
  try {
    const Authorization = <string>localStorage.getItem("token")
    const newPost = await axios.post(
      VITE_API + "/post/feed?page=" + page,
      {},
      { headers: { Authorization } }
    )
    console.log(newPost)

    return newPost.data.posts
  } catch (err: any) {
    toast.error(err.response.data.error)
    return []
  }
}
