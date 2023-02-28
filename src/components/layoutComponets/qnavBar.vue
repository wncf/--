<template>
  <van-tabbar v-model="active" route placeholder fixed>
    <van-tabbar-item to="/chat">
      <template #icon="props">
        <img class="nav_img" :src="props.active ? routList.news.open : routList.news.clone" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/friends">
      <template #icon="props">
        <img class="nav_img" :src="props.active ? routList.friends.open : routList.friends.clone" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item>
      <template #icon="props">
        <img class="add_img" src="/nav/add.png" @click="showPopup" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/home">
      <template #icon="props">
        <img class="nav_img" :src="props.active ? routList.home.open : routList.home.clone" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/user">
      <template #icon="props">
        <img class="nav_img" :src="props.active ? routList.user.open : routList.user.clone" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
  <van-popup closeable v-model:show="show" style="height: 50%" position="bottom">
    <div class="create_dynamic">
      <div class="dynamic_title">发布动态</div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field name="checkboxGroup" label="范围">
            <template #input>
              <van-radio-group v-model="checked" direction="horizontal">
                <van-radio name="public">公共动态</van-radio>
                <van-radio name="friend">仅朋友可见</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-model="message"
            rows="2"
            autosize
            label="内容"
            type="textarea"
            maxlength="150"
            placeholder="请输入内容"
            show-word-limit />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 发布 </van-button>
        </div>
      </van-form>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { coreStore } from '@/stores/core'
import { createdynamic } from '@/api/dynamic'
import { SuccessToast } from '../core/Toast'
const active = ref(0)
const route = useRoute()
const routList = {
  home: {
    open: '/nav/home_open.png',
    clone: '/nav/home_close.png',
  },
  friends: {
    open: '/nav/discover_open.png',
    clone: '/nav/discover_close.png',
  },
  news: {
    open: '/nav/news_open.png',
    clone: '/nav/news_close.png',
  },
  user: {
    open: '/nav/user_open.png',
    clone: '/nav/user_close.png',
  },
}

const show = ref(false)
const showPopup = () => {
  show.value = true
}
const checked = ref('public')
const message = ref('')

function onSubmit() {
  console.log(checked.value)    
  if (!message.value) return
  createdynamic({
    content: message.value,
    status: checked.value,
  }).then((res) => {
    SuccessToast('创建成功')
    checked.value = 'public'
    message.value = ''
    show.value = false
  })
}
</script>
<style scoped>
.create_dynamic {
  padding: 16px;
}
.dynamic_title {
  font-size: 15px;
  font-weight: 500;
  padding-bottom: 10px;
}
.nav_null {
  height: 40px;
}
.nav_bar {
  background-color: #ffffff;
  box-shadow: 0px -6px 16px 0px rgba(188, 180, 194, 0.24);
  position: fixed;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 42px;
  padding: 0 44px;
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
}
.nav_bar a {
  display: block;
  height: 42px;
}
.nav_img {
  height: 30px;
  width: 30px;
}
.add_img {
  height: 40px;
  width: 40px;
}
:deep(.van-tabbar-item--active) {
  animation: fadeIn;
  animation-duration: 0.2s;
}
</style>
