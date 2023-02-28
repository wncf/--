<template>
  <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
    <template #title>
      <div class="title_box">
        <div class="dto" :class="dto ? 'dto_online' : 'dto_offline'" v-show="dtoShow"></div>
        <div>{{ title }}</div>
      </div>
    </template>
  </van-nav-bar>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = withDefaults(
  defineProps<{
    title: string
    dto?: boolean
    dtoShow?: boolean
  }>(),
  {
    dtoShow: false,
  },
)

function onClickLeft() {
  router.back()
}
</script>
<style scoped>
.title_box {
  padding: 0 20px;
  font-size: 16px;
  position: relative;
}
.dto {
  width: var(--van-badge-dot-size);
  min-width: 0;
  height: var(--van-badge-dot-size);
  border-radius: 100%;
  border: none;
  padding: 0;
  position: absolute;
  left: 0;
  margin-top: 1px;
  top: calc(var(--van-badge-dot-size) / 2);
}
.dto_online {
  background-color: var(--van-success-color);
}
.dto_offline {
  background-color: var(--van-text-color-3);
}
</style>
