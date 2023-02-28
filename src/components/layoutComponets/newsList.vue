<template>
  <div class="container">
    <div class="left">
      <img :src="checkimageUrl(info.avatar_url)" alt="" />
      <div class="content">
        <span class="name">{{ info.nickName }}</span>
        <span class="info">{{ info.content }}</span>
      </div>
    </div>
    <div class="time">
      <span>{{ dateFormat(info.create_at) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { checkimageUrl, dateFormat } from '@/utils/core/utils'
import { ref, reactive } from 'vue'
interface userObjType {
  info: {
    content: string
    id: number
    nickName: string
    autograph: string
    gender: string
    avatar_url: string
    rid: number
    create_at: string
  }
}
const props = defineProps<userObjType>()
</script>
<style scoped>
.container {
  padding: 16px;
  border-top: 1px solid #fafaff;
  display: flex;
  justify-content: space-between;
}
.left {
  display: flex;
}
.container img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}
.content {
  padding-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.content .name {
  font-size: 16px;
}
.content .info {
  font-size: 12px;
  color: #999999;
}
.time {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.time span {
  color: #999999;
  font-size: 11px;
}
.time .sign {
  margin-top: 12.5px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #8f8ffc;
}
</style>
