<template>
  <div>
    <router-view v-slot="{ Component }">
      <div class="main">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </div>
    </router-view>
    <qnavBar />
  </div>
</template>

<script setup lang="ts">
import qnavBar from '@/components/layoutComponets/qnavBar.vue'
import { RouterLink, RouterView } from 'vue-router'
import { ref, reactive } from 'vue'
</script>
<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.main {
  height: calc(100vh - var(--van-tabbar-height));
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
