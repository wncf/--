<template>
  <div>
    <qHeader title="聊天室"> 当前在线：{{ onlines.length }}人 </qHeader>
    <div class="container_chat">
      <div class="content" id="content">
        <message-queue :data="messageList" />
      </div>
      <div class="footer">
        <input type="text" v-model="inputValue" @keyup="onsendMessageEnter" />
        <van-button type="primary" size="small" :disabled="!ifToekn()" round @click="onsendMessage">发送</van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from 'vue'
import qHeader from '@/components/layoutComponets/qHeader.vue'
import { coreStore } from '@/stores/core'
import { storeToRefs } from 'pinia'
import messageQueue from '@/components/messageQueue.vue'
import { useRoute } from 'vue-router'
import { ifToekn } from '@/utils/core/utils'
const core = coreStore()
const { sendMessage, messageListDown } = core
const onlines = storeToRefs(core).onlines
const { messageList } = storeToRefs(coreStore())
const route = useRoute()
const { nickName, id } = route.query as any
const friendName = ref(nickName)
const inputValue = ref('')
async function onsendMessageEnter(e: KeyboardEvent) {
  if (!ifToekn()) return
  if (e.code === 'Enter' && inputValue.value.trim().length) {
    sendMessageFun()
  }
}
function onsendMessage() {
  if (!ifToekn()) return
  if (!inputValue.value.trim().length) return
  sendMessageFun()
}
const sendMessageFun = async () => {
  sendMessage({
    id: +id,
    content: inputValue.value,
  })
  inputValue.value = ''
  await nextTick()
  messageListDown()
}
onMounted(async () => {
  if (messageList.value.length) {
    await nextTick()
    messageListDown()
  }
})
</script>
<style scoped lang="less">
.icon {
  width: 14.29px;
  height: 22px;
}
.container_chat {
  height: calc(100vh - var(--van-tabbar-height) - 48px);
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow: scroll;
  background: var(--van-gray-1);
}
.footer {
  background-color: #fff;
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
