<template>
  <header>
    <nav>
      <img src="/tweeter.svg" alt="logo" class="logo" />
      <ul>
        <template v-for="btn in mainMenu">
          <router-link
            v-if="typeof btn.handler === 'string'"
            :to="btn.handler"
            :class="{ current: btn.handler === path }"
          >
            {{ btn.title }}
          </router-link>
        </template>
      </ul>
      <button
        class="user btn-without-styles"
        @focus="showMenu"
        @blur="hideMenu"
      >
        <img
          src="https://osu.ppy.sh/images/layout/avatar-guest@2x.png"
          alt="profile-image"
        />
        <h2>{{ user?.name }}</h2>
        <img src="/arrow.svg" alt="arrow" />
      </button>
      <Transition>
        <ul class="userMenu" v-if="toggleUserMenu">
          <template v-for="(btn, index) in userMenu">
            <hr v-if="index === userMenu.length - 1" />
            <router-link
              v-if="typeof btn.handler === 'string'"
              :to="btn.handler + (index == 0 ? user?.id : '')"
              class="userMenu__btn"
              :class="{ disabled: btn.disabled }"
            >
              <span class="material-symbols-outlined"> {{ btn.icon }} </span>
              {{ btn.title }}
            </router-link>
            <a v-else class="userMenu__btn" @click="btn.handler">
              <span class="material-symbols-outlined"> {{ btn.icon }} </span>
              {{ btn.title }}
            </a>
          </template>
        </ul>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
  import { storeToRefs } from "pinia"
  import { ref } from "vue"
  import { useAuthStore } from "../store/useAuthStore"
  import { userMenu, mainMenu } from "../utils/navbar"
  import { useRoute } from "vue-router"

  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  const { path } = useRoute()

  const toggleUserMenu = ref(true)
  const showMenu = () => (toggleUserMenu.value = true)
  const hideMenu = () => (toggleUserMenu.value = false)
  // const showMenu = ref(false)
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
  nav ul a {
    text-decoration: none;

    font-family: "Poppins";
    font-weight: 600;
    font-size: 14px;

    color: #828282;

    cursor: pointer;
  }
  .current {
    color: #2f80ed;
    position: relative;
  }
  .current::after {
    content: "";
    position: absolute;
    width: 200%;
    height: 5px;
    background-color: #2f80ed;
    top: 40px;
    right: -50%;
    border-radius: 10px 10px 0px 0px;
  }
  .user {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #333333;

    font-family: "Noto Sans";
    font-weight: 700;
    font-size: 12px;

    cursor: pointer;
  }
  .user img:first-child {
    height: 32px;
    width: 32px;
    border-radius: 8px;
  }
  .user img:last-child {
    width: 12px;
    margin-top: 2px;
  }
  .userMenu {
    position: absolute;
    right: 0;
    top: 76px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    border: 1px solid #e0e0e0;
    background-color: #fff;
    padding: 12px 10px;
    border-radius: 12px;
    box-shadow: 0px 2px 4px 0px #0000000d;
  }
  .userMenu__btn {
    display: flex;
    align-items: center;

    width: 120px;
    height: 26px;
    gap: 10px;
    padding: 4px 10px;

    color: #4f4f4f;
    text-decoration: none;
    font-size: 12px;
    font-family: "Noto Sans";
    font-weight: 500;
    border-radius: 8px;

    cursor: pointer;
  }
  .userMenu__btn span {
    font-size: 16px;
  }
  .userMenu__btn:hover {
    background: #f2f2f2;
  }
  .userMenu__btn:last-child {
    color: red;
  }
  .userMenu hr {
    border: 1px solid #e0e0e0;
  }
  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  /* we will explain what these classes do next! */
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.1s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
    transform: translateY(-2px);
  }
</style>
