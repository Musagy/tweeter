import { createApp } from "vue"
import App from "./App.vue"
import { createPinia } from "pinia"
import "./style.css"
import Toast, { PluginOptions, POSITION } from "vue-toastification"
import "vue-toastification/dist/index.css"
import router from "./router"


const pinia = createPinia()

const toastOptions: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
}

createApp(App)
  .use(pinia)
  .use(router)
  .use(Toast, toastOptions)
  .mount("#app")
