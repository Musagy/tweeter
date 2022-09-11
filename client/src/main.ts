import { createApp } from "vue"
import {createPinia}from "pinia"
import App from "./App.vue"
import "./style.css"
import Toast, { PluginOptions, POSITION } from "vue-toastification"
import "vue-toastification/dist/index.css"

const pinia = createPinia()
const toastOptions: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
}

createApp(App).use(pinia).use(Toast, toastOptions).mount("#app")
