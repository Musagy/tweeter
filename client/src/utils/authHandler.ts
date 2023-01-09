import { useAuthStore } from "../store/useAuthStore"
import { useToast } from "vue-toastification"

const toast = useToast()

const authHandler = (err: any, elseDo?: () => any) => {
  const { logout } = useAuthStore()
  if (err.response.data === "Sección caducada o no valida") {
    logout()
    return toast.error(err.response.data)
  } else {
    if (typeof elseDo === "function") elseDo()
  }
}

export default authHandler
