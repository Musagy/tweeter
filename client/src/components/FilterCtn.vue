<template>
  <aside id="filter">
    <button
      class="filter__btn"
      v-for="filter in filters"
      :class="{ active: filterActive === filter.query }"
      @click="() => handler(filter.query)"
    >
      {{ filter.type }}
    </button>
  </aside>
</template>

<script setup lang="ts">
  import { ref } from "vue"

  const {filters} = defineProps<{
    filters:{
      type: string,
      query: string,
    } []
  }>()

  const emit = defineEmits<{
    (e: "setFilter", filter: any): void
  }>()

  const filterActive = ref(filters[0].query)

  const handler = (filter: string) => {
    emit("setFilter", filter)
    filterActive.value = filter
  }
</script>

<style scoped>
  #filter {
    display: flex;
    flex-direction: column;

    width: 304px;
    height: min-content;

    padding: 6px 0;
    background-color: white;

    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }
  .filter__btn {
    display: flex;
    margin: 20px;
    border: 0;
    background: none;
    position: relative;

    font-family: Poppins;
    font-size: 14px;
    font-weight: 600;
    color: #828282;
    cursor: pointer;
  }

  .active {
    color: #2f80ed;
  }
  .active::after {
    content: "";
    position: absolute;

    width: 3px;
    height: 32px;
    background-color: #2f80ed;

    top: -5px;
    left: -20px;

    border-radius: 0 20px 20px 0;
  }
</style>
