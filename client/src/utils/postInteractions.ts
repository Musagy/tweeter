import axios from "axios"
import { useToast } from "vue-toastification"
import { ToastID } from "vue-toastification/dist/types/types"
import { usePostModalStore } from "../store/usePostModalStore"
import authHandler from "./authHandler"

export type Interaction = {
  icon: string
  title: string
  color: string
  handler: (
    prop: number,
    retweetId?: number
  ) => Promise<ToastID | undefined> | number | void
  postRef?: "favorites" | "retweets" | "saves"
}
const { VITE_API } = import.meta.env
const toast = useToast()

const createReply = (refPostId: number) => {
  const modalStore = usePostModalStore()
  const { openModal } = modalStore
  openModal(refPostId, "reply")
}

const createRetweet = async (refPostId: number, retweetId?: number) => {
  const Authorization = <string>localStorage.getItem("token")
  if (!retweetId) {
    try {
      const { data, status } = await axios.post(
        `${VITE_API}/post/create`,
        { retweetId: refPostId, content: "", public: true },
        { headers: { Authorization } }
      )
      // Si sale un resultado distinto de 200
      if (status !== 200) return toast.error(data.response.data.error)
      // si todo sale bien
      toast("Retweet Creado")
      return data.post.id
    } catch (err: any) {
      authHandler(err, () => {
        toast.error(err.response.data.error)
      })
    }
  } else {
    try {
      const { data, status } = await axios.delete(
        `${VITE_API}/post/${retweetId}`,
        {
          headers: { Authorization },
        }
      )
      if (status !== 200) return toast.error(data.response.data.error)
      // si todo sale bien
      toast("Retweet Eliminado")
      return 0
    } catch (err: any) {
      authHandler(err, () => {
        toast.error(err.response.data)
      })
    }
  }
}

const toggle = async (refPostId: number, type: "like" | "save") => {
  try {
    const Authorization = <string>localStorage.getItem("token")
    const { data, status } = await axios.get(
      `${VITE_API}/${type}/create/${refPostId}`,
      { headers: { Authorization } }
    )
    // Si sale un resultado distinto de 200
    if (status !== 200) return toast.error(data.response.data.error)
    // si todo sale bien
    toast(data.message)
  } catch (err: any) {
    authHandler(err, () => {
      toast.error(err.response.data.error)
    })
  }
}
const toggleLike = (refPostId: number) => toggle(refPostId, "like")
const toggleSave = (refPostId: number) => toggle(refPostId, "save")

export const interactions: Interaction[] = [
  {
    icon: "mode_comment",
    title: "Comentario",
    color: "",
    handler: createReply,
  },
  {
    icon: "autorenew",
    title: "Retweet",
    color: "#27AE60",
    handler: createRetweet,
    postRef: "retweets",
  },
  {
    icon: "favorite",
    title: "Me gusta",
    color: "#EB5757",
    handler: toggleLike,
    postRef: "favorites",
  },
  {
    icon: "bookmark",
    title: "Guardar",
    color: "#2D9CDB",
    handler: toggleSave,
    postRef: "saves",
  },
]
