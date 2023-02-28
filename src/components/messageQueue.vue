<template>
  <div class="views" v-if="messageList.length">
    <van-list
      direction="up"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false">
      <div class="message_box" v-for="item of data" :key="item.id">
        <!-- sender.id = id 表示此条消息是我发出去的 -->
        <div class="content_box" v-if="item.sender?.id === id">
          <div class="content_message_box">
            <div class="nick_name">{{ item.sender ? item.sender.nickName : item.nickName }}</div>
            <div class="content">{{ item.content }}</div>
          </div>
          <img :src="checkimageUrl(item.sender.avatar_url)" alt="" class="avatar" />
        </div>
        <div class="content_firend" v-else>
          <img
            :src="checkimageUrl(item.sender?.avatar_url ? item.sender?.avatar_url : 'default_avatar.png')"
            @click="onUserInfo(item.sender)"
            alt=""
            class="avatar" />
          <div class="content_message_box">
            <div class="nick_name">{{ item.sender ? item.sender.nickName : item.nickName }}</div>
            <div class="content">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { coreStore } from '@/stores/core'
import { storeToRefs } from 'pinia'
import { checkimageUrl } from '@/utils/core/utils'
import { useRouter } from 'vue-router'
import type { messageSenderType } from '@/stores/types/core'
const core = coreStore
const router = useRouter()
const { getMessages, messageListDown, setCurrentUserInfo } = core()
const { userData, messageList } = storeToRefs(coreStore())
const { id } = userData.value

const props = withDefaults(
  defineProps<{
    data?: any
  }>(),
  {
    data: [],
  },
)
const loading = ref(false)
const finished = ref(false)
const pages = ref({
  pageNo: 1,
  pageSize: 10,
  search: {},
  sort: {
    id: 'desc',
  },
})
const onLoad = () => {
  loading.value = true
  pages.value.pageNo++
  getMessages({ ...pages.value })
    .then((res) => {
      if (res.isbottom) {
        finished.value = true
      }
    })
    .finally(() => {
      loading.value = false
    })
}
function onUserInfo(sender: messageSenderType) {
  setCurrentUserInfo(sender)
  router.push({ name: 'userInfo' })
}
</script>
<style scoped lang="less">
.views {
  padding: 10px 4px;
}
.message_box {
  display: flex;
  width: 100%;
  .content_firend,
  .content_box {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 4px;
    img {
      height: 45px;
      width: 45px;
      border-radius: 50%;
      background-color: #fff;
    }
    .content_message_box {
      max-width: 73%;
      .nick_name {
        font-size: 12px;
      }
      .content {
        margin-top: 4px;
        background: var(--van-primary-color);
        padding: 10px;
        border-radius: 12px;
        overflow-wrap: anywhere;
      }
    }
  }
  .content_firend {
    justify-content: start;
    .content_message_box {
      .content {
        margin-left: 4px;
        color: #000;
        background-color: #fff;
      }
    }
  }
  .content_box {
    justify-content: end;
    .content_message_box {
      margin-right: 4px;
      .nick_name {
        text-align: right;
      }
      .content {
        color: #fff;
      }
    }
  }
}
</style>
