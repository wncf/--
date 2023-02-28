<template>
  <div class="home_container">
    <q-header title="动态">
      <div class="list">
        <van-dropdown-menu>
          <van-dropdown-item @change="dropdownChange" v-model="dynamicType" :options="option" />
        </van-dropdown-menu>
      </div>
    </q-header>
    <div class="dynamic-list">
      <van-pull-refresh style="height: 100%" v-model="refreshing" @refresh="onRefresh">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <dynamic_card v-for="item of dynamicList" :data="item" :key="item.id" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup lang="ts">
import qHeader from '../components/layoutComponets/qHeader.vue'
import dynamic_card from '../components/dynamicCard.vue'
import { coreStore } from '@/stores/core'
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { ifToekn } from '@/utils/core/utils'
const core = coreStore()
const { getDynamicList } = core
const { dynamicType, dynamicList } = storeToRefs(core)
const value2 = ref(0)
const getPageParms = ref({
  pageNo: 1,
  pageSize: 10,
  search: {},
  sort: {
    create_at: 'desc',
  },
})
const option = [
  { text: '公共动态', value: 'public' },
  { text: '好友动态', value: 'friend' },
]
const dropdownChange = (value: any) => {
  if (!ifToekn() && value === 'friend') return
  getDynamicList({
    ...getPageParms.value,
    status: dynamicType.value,
  })
}

const loading = ref(false)
const finished = ref(true)
const refreshing = ref(false)
function onRefresh() {
  getDynamicList({
    ...getPageParms.value,
    status: dynamicType.value,
  }).finally(() => {
    refreshing.value = false
  })
}
function onLoad() {}
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.avatar-box {
  display: flex;
  padding-right: 15px;
  flex-direction: column;
}
.avatar-img {
  height: 58px;
  width: 58px;
  border-radius: 50%;
}
:deep(.van-dropdown-menu__bar) {
  box-shadow: none;
}
.avatar-name {
  color: #000000;
  font-weight: 400;
  font-size: 12px;
  margin-top: 4px;
  font-style: normal;
  text-align: center;
}
.dynamic-list {
  flex: 1;
  padding: 0 16px;
  padding-top: 30px;
  overflow: scroll;
}
</style>
