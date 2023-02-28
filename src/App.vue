<script setup lang="ts">
import loginForm from '@/components/core/loginForm.vue'
import { onMounted, ref, watch, reactive } from 'vue'
import { RouterView } from 'vue-router'
import { getToken, getPrimary_color } from '@/utils/core/utils'
import { coreStore } from '@/stores/core'
import { storeToRefs } from 'pinia'
import { syncLoadingToast } from './components/core/Toast'

const core = coreStore()
const { setUserData, initIo, getMessages, messageListDown, getFriend, getDynamicList } = coreStore()
const popupState = storeToRefs(core).popupState
const { primaryColor, setPrimary_color } = core
console.log(primaryColor)

onMounted(async () => {
  const token = getToken()
  if (token) {
    await setUserData()
    await getMessages({
      pageNo: 1,
      pageSize: 20,
      search: {},
      sort: {
        id: 'desc',
      },
    })
    messageListDown()
    await getFriend()
    await getDynamicList({
      pageNo: 1,
      pageSize: 10,
      search: {},
      sort: {
        create_at: 'desc',
      },
      status: 'public',
    })
  } else {
    core.updatePopuState(true)
    await getMessages({
      pageNo: 1,
      pageSize: 20,
      search: {},
      sort: {
        id: 'desc',
      },
    })
    await getDynamicList({
      pageNo: 1,
      pageSize: 10,
      search: {},
      sort: {
        create_at: 'desc',
      },
      status: 'public',
    })
    messageListDown()
  }
})
const ChangeCarrierRef = ref(null)
const clone = () => {
  ChangeCarrierRef.value.resetForm()
  return true
}
// 设置默认主题色
setPrimary_color(getPrimary_color())
</script>

<template>
  <RouterView />
  <van-popup v-model:show="popupState" :before-close="clone" class="my_popup" closeable z-index="2">
    <login-form ref="ChangeCarrierRef" />
  </van-popup>
</template>

<style>
.my_popup {
  padding: 20px;
}
</style>
