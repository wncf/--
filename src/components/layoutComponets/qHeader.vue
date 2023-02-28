<template>
  <div class="qheader-box">
    <h1 class="title">{{ title }}</h1>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
<style scoped>
.qheader-box {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
}
.title {
  font-weight: 600;
  font-size: 20px;
  font-style: normal;
}
</style>
