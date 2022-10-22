<template>
  <header>
    <nav>
      <img src="/tweeter.svg" alt="logo" class="logo" />
      <ul>
        <li>Inicio</li>
        <li>Explorar</li>
        <li>Marcadores</li>
      </ul>
      <button class="profile btn-without-styles">
        <img
          src="https://osu.ppy.sh/images/layout/avatar-guest@2x.png"
          alt="profile-image"
        />
        <h2>{{ user?.name }}</h2>
        <img src="/arrow.svg" alt="arrow" />
      </button>
      <div class="profile-options">
        <button>
          <span class="material-symbols-outlined"> account_circle </span>
          Mi Perfil
        </button>
        <button>
          <span class="material-symbols-outlined"> group </span>
          Chat Grupal
        </button>
        <button>
          <span class="material-symbols-outlined"> settings </span>
          Ajustes
        </button>
        <hr />
        <button>
          <span class="material-symbols-outlined"> logout </span>
          Cerrar Sección
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useAuthStore } from "../store/useAuthStore"

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>
<style scoped>
header {
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
  background-color: white;
}
nav {
  margin: 0 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 68px;
  width: 100%;
  max-width: 1296px;

  position: relative;
}
.logo {
  height: 28.77px;
}
nav ul {
  display: flex;
  gap: 80px;
}
nav ul li {
  list-style: none;

  font-family: "Poppins";
  font-weight: 600;
  font-size: 14px;

  color: #828282;
}
.profile {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333333;

  font-family: "Noto Sans";
  font-weight: 700;
  font-size: 12px;
}
.profile img:first-child {
  height: 32px;
  width: 32px;
  border-radius: 8px;
}
.profile img:last-child {
  width: 12px;
  margin-top: 2px;
}
.profile-options {
  position: absolute;
  right: 0;
  top: 76px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: #fff;
  padding: 15px 14px;
  border-radius: 12px;
}
</style>
