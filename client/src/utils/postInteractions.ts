import axios from "axios"
import { Ref } from "vue"
import { useToast } from "vue-toastification"
import { usePostModalStore } from "../store/usePostModalStore"

export type Interaction = {
  icon: string
  title: string
  color: string
  handler: (prop: number) => void
}
const { VITE_API } = import.meta.env
const toast = useToast()

const createReply = (refPostId: number) => {
  const modalStore = usePostModalStore()
  const { openModal } = modalStore
  openModal(refPostId, "reply")
}

const createRetweet = async (refPostId: number) => {
  try {
    const Authorization = <string>localStorage.getItem("token")
    const { data, status } = await axios.post(
      `${VITE_API}/psot/create`,
      { retweetId: refPostId },
      { headers: { Authorization } }
    )
    // Si sale un resultado distinto de 200
    if (status !== 200) return toast.error(data.response.data.error)
    // si todo sale bien
    toast(data.message)
  } catch (err: any) {
    toast.error(err.response.data.error)
  }
}

const toggle = async (refPostId: number, type: "like" | "save") => {
  try {
    const Authorization = <string>localStorage.getItem("token")
    const { data, status } = await axios.post(
      `${VITE_API}/${type}/${refPostId}`,
      {},
      { headers: { Authorization } }
    )
    // Si sale un resultado distinto de 200
    if (status !== 200) return toast.error(data.response.data.error)
    // si todo sale bien
    toast(data.message)
  } catch (err: any) {
    toast.error(err.response.data.error)
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
  },
  {
    icon: "favorite",
    title: "Me gusta",
    color: "#EB5757",
    handler: toggleLike,
  },
  {
    icon: "bookmark",
    title: "Guardar",
    color: "#2D9CDB",
    handler: toggleSave,
  },
]
