<template>
  <section class="trends__panel">
    <h3>Trends para ti</h3>
    <hr />
    <div class="trends__ctn">
      <RouterLink v-for="trend in trends" :to="'/search/' + trend.id">
        <b>#{{ trend.id }}</b>
        <span>{{ trend._count.posts }} Tweets</span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import type { Trends } from "../types/Model"
  import * as PostQueries from "../utils/postQueries"

  const trends = ref<Trends[]>([])
  onMounted(async () => {
    const res: Trends[] = await PostQueries.getTrends()
    trends.value = res
  })
</script>

<style scoped>
  section {
    background-color: white;
    padding: 12px 20px 32px;
    display: flex;
    flex-direction: column;

    border-radius: 12px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  }
  h3 {
    font-family: Poppins;
    font-size: 12px;
    font-weight: 600;
  }
  hr {
    margin: 4px 0 8px;
    border: 1px solid #e0e0e0;
  }
  :deep(a) {
    display: flex;
    text-decoration: none;
    flex-direction: column;
    padding: 12px 0;
  }
  b {
    font-family: Noto Sans;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
  }
  span {
    font-family: Noto Sans;
    font-size: 12px;
    font-weight: 500;
    color: #828282;
  }
</style>
