// import { useRouter } from "vue-router"
import { useAuthStore } from "../store/useAuthStore"

export type btn = {
  icon?: string
  title: string
  handler: (() => void | string) | string
  disabled?: boolean
}

export const mainMenu: btn[] = [
  {
    title: "Inicio",
    handler: "/",
  },
  {
    title: "Explorar",
    handler: "/search",
  },
  {
    title: "Marcadores",
    handler: "/bookmarks",
  },
]

export const userMenu: btn[] = [
  {
    title: "Mi Perfil",
    icon: "account_circle",
    handler: "/user/",
  },
  {
    title: "Chat Grupal",
    icon: "group",
    handler: "/chat",
    disabled: true,
  },
  {
    title: "Ajustes",
    icon: "settings",
    handler: "/settings",
  },
  {
    title: "Cerrar Sección",
    icon: "logout",
    handler: () => useAuthStore().logout(),
  },
]
