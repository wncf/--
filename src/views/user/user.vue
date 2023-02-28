<template>
  <div>
    <img class="bgc" src="@/assets/user/bgc.png" alt="" />
    <q-header title="个人中心">
      <edit class="edit" @click="clickSetting" />
    </q-header>
    <div class="user_content" @click="clickAvatar">
      <img :src="checkimageUrl(userData.avatar_url)" alt="" />
      <span class="name">{{ userData.nickName }}</span>
      <span class="id user_text"> ID：{{ userData.id }} </span>
      <span class="sign user_text">{{ userData.autograph }}</span>
    </div>
    <div class="content">
      <div class="box_item van-haptics-feedback" @click="showRight = true" >
        <img class="content_icon" src="@/assets/user/discover.png" alt="" />
        <span>切换主题</span>
      </div>
      <div class="box_item">
        <img class="content_icon" src="@/assets/user/start.png" alt="" />
        <span>我的收藏</span>
      </div>
      <div class="box_item">
        <img class="content_icon" src="@/assets/user/help.png" alt="" />
        <span>帮助中心</span>
      </div>
      <div class="box_item van-haptics-feedback" @click="clickSetting">
        <img class="content_icon" src="@/assets/user/setting.png" alt="" />
        <span>修改信息</span>
      </div>
      <div class="box_item van-haptics-feedback" @click="clickLogout" style="display: flex">
        <div class="login_icon content_icon">
          <logout class="logut_svg" />
        </div>
        <span>退出登录</span>
      </div>
    </div>
    <van-popup v-model:show="showRight" position="bottom" :style="{ width: '100%', height: '40%' }">
      <div class="color_options">
        <van-grid :column-num="5">
          <van-grid-item @click="onCheckColor(value)" v-for="value of colors" :key="value.value" :text="value.name">
            <template #icon>
              <div
                :style="{ background: value.value }"
                class="box"
                :class="{ box_option: primaryColor === value.value }"></div>
            </template>
          </van-grid-item>
        </van-grid>
      </div> </van-popup
    >>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import search from '@/components/icons/search.vue'
import qHeader from '@/components/layoutComponets/qHeader.vue'
import edit from '@/components/icons/edit.vue'
import logout from '@/components/icons/logout.vue'
import { coreStore } from '@/stores/core'
import { storeToRefs } from 'pinia'
import { showConfirmDialog } from 'vant'
import { checkimageUrl, clearToken, ifToekn } from '@/utils/core/utils'
import { useRouter } from 'vue-router'
import { colors } from '@/core/color_options'
const router = useRouter()
const core = coreStore()
const userData = storeToRefs(core).userData
const primaryColor = storeToRefs(core).primaryColor
const { UserLogout, setPrimary_color } = core
const info = {
  follow: 68,
  fans: 123,
  support: 630,
}
const clickLogout = () => {
  if (!ifToekn()) return
  showConfirmDialog({
    title: '确认要退出登录吗',
  })
    .then(() => {
      UserLogout()
    })
    .catch(() => {})
}
const clickAvatar = () => {
  if (!ifToekn()) {
    core.updatePopuState(true)
  }
}

function clickSetting() {
  if (!ifToekn()) return
  router.push({
    name: 'userSettings',
  })
}
const showRight = ref(false)
const onCheckColor = (e: any) => {
  setPrimary_color(e.value)
}
</script>
<style scoped lang="less">
.badge-icon {
  display: block;
  font-size: 10px;
  line-height: 16px;
}
.box {
  height: 40px;
  width: 40px;
  position: relative;
}
.box_option::after {
  content: '';
  position: absolute;
  height: 20px;
  width: 20px;
  right: -10px;
  top: -10px;
  background-image: url('../../assets/start.svg');
  transform: rotate(45deg);
  background-position: center;
  background-size: cover;
}
.bgc {
  background-repeat: no-repeat;
  width: 375px;
  height: 100vh;
  position: fixed;
  z-index: -1;
  opacity: 0.16;
  filter: blur(23px);
  left: 0;
  top: 0;
}
.edit {
  display: block;
  width: 19.35px;
  height: 19.61px;
}
.user_content {
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user_content img {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.user_content .name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
}
.user_content .id {
  margin-bottom: 2px;
}
.user_text {
  font-size: 12px;
  color: #979797;
}
.content {
  /* height: 348px; */
  padding-left: 16px;
  margin-top: 30px;
  border-radius: 20px 20px 0px 0px;
  background-color: #fff;
  width: 100%;
  padding-top: 40px;
  padding-bottom: 23px;
}
.content_icon {
  height: 35px;
  width: 35px;
}
.login_icon {
  height: 35px;
  width: 35px;
  border-radius: 10px;
  background-color: #ffe6e7;
  display: flex;
}
.box_item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.box_item > span {
  padding-left: 15px;
}
.logut_svg {
  display: block;
  width: 21px;
  height: 21px;
  margin: auto;
  color: #f4484d;
}
</style>
