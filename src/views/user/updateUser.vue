<template>
  <navBar title="编辑个人信息" right-text="保存" @click-right="save" />
  <div class="container">
    <van-cell-group>
      <van-cell title="头像" value="内容">
        <template #value>
          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
        </template>
      </van-cell>
      <van-field label="昵称" v-model="nickName" />
      <van-field label="性别" v-model="gender" is-link readonly placeholder="选择性别" @click="showPicker = true" />
      <van-field label="签名" v-model="autograph" />
    </van-cell-group>
  </div>
  <van-popup v-model:show="showPicker" round position="bottom">
    <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
  </van-popup>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import navBar from '@/components/layoutComponets/navBar.vue'
import { coreStore } from '@/stores/core'
import { storeToRefs } from 'pinia'
import type { UploaderFileListItem } from 'vant'
import { SuccessToast } from '@/components/core/Toast'
import { uploadImag } from '@/api/auth'
import { updateUserInfo } from '@/api/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const core = coreStore()
const { syncsetUserData } = core
const { userData } = storeToRefs(core)
const defaultImgUrl = import.meta.env.VITE_BASE_URL
let imageUpdateRes: any = null
const fileList = ref<Array<UploaderFileListItem>>([
  {
    url: `${defaultImgUrl}/uploads/${userData.value.avatar_url}`,
    status: 'done',
  },
])
function afterRead(event: any) {
  event.status = 'uploading'
  event.message = '上传中...'
  const mfile = new FormData()
  mfile.append('file', event.file)
  uploadImag(mfile)
    .then((res: any) => {
      SuccessToast('图片上传成功')
      event.status = 'done'
      event.message = '上传成功'
      imageUpdateRes = res
    })
    .catch((err) => {
      event.status = 'failed'
      event.message = '上传失败'
    })
}
const showPicker = ref(false)
const columns = [
  { text: '男', value: '男' },
  { text: '女', value: '女' },
  { text: '未知', value: '未知' },
]
const onConfirm = (data: any) => {
  showPicker.value = false
  gender.value = data.selectedOptions[0].value
}

const nickName = ref(userData.value.nickName)
const gender = ref(userData.value.gender)
const autograph = ref(userData.value.autograph)
function save() {
  const data: any = {
    nickName: nickName.value,
    gender: gender.value,
    autograph: autograph.value,
  }
  if (imageUpdateRes) {
    data.avatar_url = imageUpdateRes.data.filename
  }
  updateUserInfo(data).then((res) => {
    SuccessToast('保存成功')
    syncsetUserData(data)
    router.back()
  })
}
</script>
<style scoped lang="less">
:deep(.van-cell) {
  line-height: 24px;
  align-items: center;
}
:deep(.van-uploader__upload) {
  height: 58px;
  width: 58px;
}
:deep(.van-image) {
  height: 58px;
  width: 58px;
}
.container {
  background-color: #fff;
  padding: 0 16px;
}
</style>
