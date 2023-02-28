<template>
  <!-- <navBar :dtoShow="true" :dto="onlines.includes(+id)" :title="nickName"></navBar> -->
  <div class="container">
    <div class="content">
    </div>
    <div class="footer">
      <input type="text" v-model="inputValue" @keyup.enter="onsendMessage" />
      <van-button type="primary" size="small" round @click="onsendMessage">发送</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { coreStore } from '@/stores/core'
import navBar from '@/components/layoutComponets/navBar.vue'
import messageQueue from '@/components/messageQueue.vue'
import { storeToRefs } from 'pinia'

const core = coreStore()
const onlines = storeToRefs(core).onlines
const { sendMessage } = core
const route = useRoute()
const { nickName, id } = route.query as any
const friendName = ref(nickName)
const inputValue = ref('')
function onsendMessage() {
  sendMessage({
    id: +id,
    content: inputValue.value,
  })
}
</script>
<style scoped lang="less">
.container {
  height: calc(100vh - var(--van-nav-bar-height));
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow: auto;
  background: var(--van-gray-1);
}
.footer {
  background-color:#fff;
  width: 100%;
  height: 48px;
  padding: 10px;
  display: flex;
  align-items: center;
  input {
    flex: 1;
    height: 32px;
    padding-left: 1em;
    background: var(--van-gray-1);
    border-radius: 12px;
  }
}
:deep(.van-button) {
  padding: 0 16px;
  margin-left: 10px;
}
</style>
