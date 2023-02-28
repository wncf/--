<template>
  <div class="container">
    <div>
      <q-header title="我的好友"> </q-header>
      <headerSearch />
    </div>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <div class="friend_list" v-if="friends">
        <div class="friend_box" v-for="item of friends" :key="item.id" @click="onUserInfo(item)">
          <van-icon
            :name="checkimageUrl(item.avatar_url)"
            dot
            :class="onlines.find((label) => label.sub === item.id) ? 'my_dto' : ''" />
          <div>
            <span class="nickName">{{ item.nickName }}</span>
            <span class="autograph">{{ item.autograph }} </span>
          </div>
        </div>
      </div>
      <div v-else>
        <van-empty description="你还没有好友，快去添加好友吧" />
      </div>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import search from '@/components/icons/search.vue'
import headerSearch from '@/components/layoutComponets/headerSearch.vue'
import qHeader from '@/components/layoutComponets/qHeader.vue'
import { coreStore } from '@/stores/core'
import { checkimageUrl, getToken } from '@/utils/core/utils'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const core = coreStore()
const router = useRouter()
const { setCurrentUserInfo } = core
const friends = storeToRefs(core).friends
const onlines = storeToRefs(core).onlines
onMounted(() => {
  if (!getToken()) return
  if (!friends.value.length) {
    core.getFriend()
  }
})
const loading = ref(false)
function onRefresh() {
  if (!getToken()) return (loading.value = false)
  core.getFriend().finally(() => {
    loading.value = false
  })
}
function onUserInfo(data: any) {
  setCurrentUserInfo(data)
  router.push({
    path: '/userInfo',
    name: 'userInfo',
  })
}
</script>
<style scoped lang="less">
:deep(.van-badge--dot) {
  background-color: var(--van-text-color-3);
}
.my_dto :deep(.van-badge) {
  background-color: var(--van-success-color);
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
:deep(.van-icon__image) {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}
:deep(.van-pull-refresh) {
  flex: 1;
}
.friend_list {
  margin: 16px;
  margin-top: 10px;
  height: 100%;
}
.friend_box {
  display: flex;
  img {
    height: 45px;
    width: 45px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 12px;
    .nickName {
      font-size: 14px;
    }
    .autograph {
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>
