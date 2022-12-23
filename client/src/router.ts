import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

// Importar componentes de vista
import Home from "./pages/Home.vue"
import Login from "./pages/Login.vue"
import Register from "./pages/Register.vue"

const routes: Readonly<RouteRecordRaw[]> = [
  { path: "/", component: Home, name: "Home", meta: { reqAuth: true } },
  { path: "/login", component: Login, name: "Login", meta: { reqAuth: false } },
  {
    path: "/register",
    component: Register,
    name: "Register",
    meta: { reqAuth: false },
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
  if (user && !to.meta.reqAuth) {
    return { name: "Home" }
  }
})

export default router
