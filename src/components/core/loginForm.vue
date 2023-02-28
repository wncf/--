<template>
  <div class="container">
    <van-form @submit="onSubmit" label-width="60px">
      <van-cell-group inset>
        <van-field
          v-model="user_name"
          name="user_name"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true }]" />
        <van-field
          v-model="nickName"
          v-if="state"
          type="text"
          name="nickName"
          label="昵称"
          placeholder="请输入昵称"
          :rules="[{ required: true }]" />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true }]" />
        <van-field
          v-if="state"
          v-model="confirmed_password"
          type="password"
          name="confirmed_password"
          label="确认密码"
          placeholder="请确认密码"
          :rules="[{ required: true }]" />
        <van-field
          v-show="state"
          v-model="email"
          type="text"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          :rules="[{ required: true }]">
          <template #button>
            <van-button v-show="!ifGetsms" size="small" type="primary" @click="onGetSms">获取验证码 </van-button>
            <van-count-down v-show="ifGetsms" ref="countDownRef" :time="time" format="ss秒" :auto-start="false" />
          </template>
        </van-field>
        <van-field
          v-if="state"
          name="code"
          v-model="code"
          type="number"
          label="邮箱验证码"
          placeholder="请输入邮箱验证码">
        </van-field>
      </van-cell-group>
      <div class="remember" v-show="!state">
        <van-checkbox v-model="checked" shape="square" icon-size="3.733333vw">记住密码</van-checkbox>
        <div class="notpassword">
          <span>忘记密码</span>
        </div>
      </div>
      <div class="submit_btn">
        <van-button round block type="primary" color="#8F8FFC" native-type="submit">
          {{ state ? '注册' : '登录' }}
        </van-button>
      </div>
    </van-form>
    <div class="tools">
      <div class="check">
        <span :style="state ? '' : checkStatus" @click="checkLogin">登录</span>
        <span>/</span>
        <span :style="state ? checkStatus : ''" @click="checkLogin">注册</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, nextTick } from 'vue'
import { useToggle } from '@vant/use'
import { login, register } from '@/api/auth'
import { SuccessToast, FailToast } from '@/components/core/Toast'
import { setToken } from '@/utils/core/utils'
import { coreStore } from '@/stores/core'
import { getSms } from '@/api/auth'
const checked = ref(false)
const user_name = ref('')
const password = ref('')
const confirmed_password = ref('')
const email = ref('')
const code = ref('')
const time = ref(60 * 1000)
const ifGetsms = ref(false)
const countDownRef = ref(null)
const nickName = ref('')
const { updatePopuState, setUserData } = coreStore()
interface formTypes {
  user_name: string
  password: string
  confirmed_password?: string
  email?: string
  nickName: string
  code: string | number
}

const onSubmit = async (values: formTypes) => {
  // 登录
  if (!state.value) {
    const res = (await login(values)) as any
    if (res.success) {
      setToken(res.data.token, checked.value)
      await setUserData()
      SuccessToast('登录成功')
      resetForm()
      updatePopuState(false)
    }
  }
  // 注册
  if (state.value) {
    if (values.password === values.confirmed_password) {
      const res = (await register(values)) as any
      if (res.success) {
        setToken(res.data.token, false)
        await setUserData()
        SuccessToast('注册成功，已经为您自动登录')
        resetForm()
        updatePopuState(false)
      }
      return
    } else {
      FailToast('两次输入的密码不一致')
    }
  }
}

const [state, toggle] = useToggle()
const checkStatus = ref({
  color: '#000',
  transform: 'scale(1.2)',
})
const checkLogin = () => {
  toggle()
}

function resetForm() {
  checked.value = false
  user_name.value = ''
  password.value = ''
  confirmed_password.value = ''
  email.value = ''
}
async function onGetSms() {
  if (!email.value.trim().length) return
  ifGetsms.value = true
  await getSms({ email: email.value }).catch((err) => {
    return
  })
  await nextTick()
  countDownRef.value.start()
}
defineExpose({ resetForm })
</script>
<style scoped lang="less" var="color">
:deep(.van-field__label) {
  font-size: 12px;
}
.submit_btn {
  padding: 12px 24px;
}
.title {
  font-size: 18px;
  font-weight: 500;
}
.remember {
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
  span {
    color: #979797;
    font-size: 13px;
  }
}
.tools {
  display: flex;
  justify-content: right;
  color: #979797;
  font-size: 14px;
  padding-right: 12px;
  .check {
    display: flex;
    > span {
      display: block;
      font-size: 12px;
      padding-right: 4px;
    }
  }
}
</style>
