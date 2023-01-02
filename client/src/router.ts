import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

// Importar componentes de vista
import Home from "./pages/Home.vue"
import Login from "./pages/Login.vue"
import Register from "./pages/Register.vue"
import User from "./pages/user/[id].vue"
import PostById from "./pages/post/[id].vue"
import Settings from "./pages/Settings.vue"
import Search from "./pages/Search.vue"
import Save from "./pages/Save.vue"

const routes: Readonly<RouteRecordRaw[]> = [
  { path: "/", component: Home, name: "Home", meta: { reqAuth: true } },
  { path: "/login", component: Login, name: "Login", meta: { reqAuth: false } },
  {
    path: "/register",
    component: Register,
    name: "Register",
    meta: { reqAuth: false },
  },
  { path: "/user/:id", component: User, name: "User" },
  { path: "/post/:id", component: PostById, name: "Post by Id" },
  { path: "/settings", component: Settings, name: "Settings" },
  {
    path: "/search/:search",
    component: Search,
    name: "Search that",
  },
  {
    path: "/search",
    component: Search,
    name: "Search",
  },
  {
    path: "/save",
    component: Save,
    name: "Save",
    meta: { reqAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(to => {
  const user = localStorage.getItem("user")
  if (!user && to.meta.reqAuth) {
    return { name: "Login" }
  }
  if (user && to.meta.reqAuth === false) {
    return { name: "Home" }
  }
})

export default router
