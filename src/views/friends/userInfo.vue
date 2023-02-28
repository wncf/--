<template>
  <navBar title="个人资料"></navBar>
  <div class="container" v-if="currentUserInfo">
    <van-cell-group>
      <van-cell title="头像">
        <template #value>
          <img :src="checkimageUrl(currentUserInfo.avatar_url)" alt="" />
        </template>
      </van-cell>
      <van-cell title="昵称" :value="currentUserInfo.nickName" />
      <van-cell title="性别" :value="currentUserInfo.gender" />
      <van-cell title="签名" :value="currentUserInfo.autograph" />
    </van-cell-group>
    <div class="tools">
      <van-button type="primary" block plain v-if="!ifFrined()" size="small" @click="onaddFrined">添加好友</van-button>
      <van-button type="danger" block plain v-else size="small" @click="onReomveFrined">删除好友</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import navBar from '@/components/layoutComponets/navBar.vue'
import { showConfirmDialog } from 'vant'
import { coreStore } from '@/stores/core'
import type { friend } from '@/stores/types/core'
import { checkimageUrl } from '@/utils/core/utils'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { addFriend, removeFriend } from '@/api/friend'
import { useRoute, useRouter } from 'vue-router'
import { SuccessToast } from '@/components/core/Toast'
import {} from '@/api/friend'
const { currentUserInfo, userData, friendList } = storeToRefs(coreStore())

const core = coreStore()
const { getFriend } = core
const router = useRouter()
const route = useRoute()
function ifFrined(): boolean {
  return friendList.value.filter((item) => item.id === currentUserInfo.value.id).length === 1
}
function onReomveFrined() {
  showConfirmDialog({
    title: '确认删除该好友吗',
  })
    .then(() => {
      removeFriend(currentUserInfo.value.id).then(() => {
        SuccessToast('删除成功')
        getFriend()
      })
    })
    .catch(() => {})
}
function onaddFrined() {
  if (!currentUserInfo.value.id) return
  showConfirmDialog({
    title: '确认加他为好友吗',
  })
    .then(() => {
      addFriend({ id: currentUserInfo.value.id }).then((res) => {
        SuccessToast('添加成功')
        getFriend()
      })
    })
    .catch(() => {})
}
</script>
<style scoped lang="less">
.container {
  padding: 0 16px;
  height: calc(100vh - var(--van-nav-bar-height));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
:deep(.van-cell) {
  display: flex;
  align-items: center;
}
:deep(.van-cell__value) img {
  height: 32px;
  width: 32px;
}
.tools {
  display: flex;
  padding: 16px;
  justify-content: space-between;
}
</style>
