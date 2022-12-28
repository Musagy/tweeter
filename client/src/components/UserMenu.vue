<template>
  <button class="user btn-without-styles" @focus="showMenu" @blur="hideMenu">
    <Avatar userId="user" />
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
</template>

<script setup lang="ts">
  import { userMenu } from "../utils/navbar"
  import { useAuthStore } from "../store/useAuthStore"
  import { storeToRefs } from "pinia"
  import { ref } from "vue"
  import Avatar from "./Avatar.vue"

  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  const toggleUserMenu = ref(false)
  const showMenu = () => (toggleUserMenu.value = true)
  const hideMenu = () => (toggleUserMenu.value = false)
</script>

<style scoped>
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
