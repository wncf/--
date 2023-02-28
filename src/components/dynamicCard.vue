<template>
  <div class="container">
    <div class="box">
      <img :src="checkimageUrl(data.sender.avatar_url)" alt="" class="avatar" />
      <div class="title-text">
        <span class="name">{{ data.sender.nickName }}</span>
        <span class="time">{{ dateFormat(data.create_at) }}</span>
      </div>
    </div>
    <div class="content">
      {{ data.content }}
    </div>
    <div class="tools">
      <div class="left_tools">
        <!-- <div class="tools_box">
          <span>{{ data.goodNumber }}</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import like from './icons/like_filled.vue'
import start from './icons/start.vue'
import news from './icons/news.vue'
import type { dynamic_type } from '@/stores/types/core'
import { checkimageUrl, dateFormat } from '@/utils/core/utils'
import dayjs from 'dayjs'
const props = withDefaults(defineProps<{ data: dynamic_type }>(), {})
</script>
<style scoped>
.container {
  padding-bottom: 15px;
  margin-bottom: 20px;
}
.box {
  display: flex;
}
.avatar {
  border-radius: 50%;
  height: 35px;
  width: 35px;
  margin-right: 12px;
}
.title-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.name {
  font-size: 16px;
}
.time {
  font-size: 12px;
  color: #999999;
}
.content {
  margin-top: 15px;
  font-size: 14px;
  padding-bottom: 4px;
}
.tools {
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
}
.left_tools {
  display: flex;
  align-items: center;
}
.left_tools svg {
  height: 18px;
  width: 18px;
}
.left_tools span {
  margin-left: 4px;
}
.tools_box {
  display: flex;
  align-items: center;
  margin-right: 15px;
}
.right_icon {
  height: 18px;
  width: 18px;
}
</style>
