<template>
  <div class="container">
    <div class="search_box">
      <search class="search_icon" />
      <input type="text" placeholder="搜索" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import search from '../icons/search.vue'
</script>
<style scoped>
.container {
  padding: 0 16px;
  margin-top: 4px;
  margin-bottom: 12px;
}
.search_box {
  border-radius: 178px;
  height: 30px;
  width: 100%;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  padding: 4px 10px;
}
.search_icon {
  display: block;
  color: #989898;
  width: 19px;
  height: 23.33px;
}
input {
  display: block;
  background: none;
  height: 100%;
  width: 100%;
  padding-left: 3.5px;
}
input::placeholder {
  font-size: 14px;
}
</style>
