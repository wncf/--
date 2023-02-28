import { clearToken, getToken } from './../utils/core/utils'
import type { friend, message, messageSenderType, online_type, userType, dynamic_type } from './types/core'
import { getUserInfo } from '@/api/auth'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { getFriendList } from '@/api/friend'
import { initSocket } from '@/utils/core/ws'
import type { Socket } from 'socket.io-client'
import { getMessage } from '@/api/message'
import { nextTick } from 'vue'
import { getdynamic_public, getdynamic_friend } from '@/api/dynamic'

export const coreStore = defineStore({
  id: 'core',
  state: () => ({
    popupState: false as boolean,
    io: null as Socket,
    dynamicType: 'public',
    primaryColor: '#8F8FFC',
    userData: {
      avatar_url: 'default_avatar.png',
      email: '',
      autograph: '请先登录',
      id: 1,
      gender: '未知',
      user_name: '',
      nickName: '游客',
    } as userType,
    friendList: [] as friend[],
    onlines: [] as online_type[],
    messageList: [] as message[],
    dynamicList: [] as dynamic_type[],
    currentUserInfo: {} as messageSenderType,
  }),
  getters: {
    items: () => {},
    friends: (state) => state.friendList,
  },
  actions: {
    updatePopuState(value: boolean) {
      this.popupState = value
    },
    // 初始化ws
    initIo() {
      this.io = initSocket(getToken()).socket
      // 事件监听
      this.io.on('new_message', async (data: message) => {
        // 当前用户发送不做处理
        if (data.id != this.userData.id) {
          this.messageList.push(data)
          console.log('我不应该触发')

          await nextTick()
          this.messageListDown()
        }
      })
      this.io.on('online', (data: any) => {
        this.onlines = data
      })
    },
    getOnline() {
      this.io.emit('getOnline')
    },
    UserLogout() {
      this.userData = {
        avatar_url: 'default_avatar.png',
        email: '',
        autograph: '请先登录',
        id: 1,
        gender: '未知',
        user_name: '',
        nickName: '游客',
      }
      clearToken()
      this.onlines = []
      this.friendList = []
      this.io.disconnect()
    },
    sendMessage(data: any) {
      this.messageList.push({
        id: this.messageList.length + 1,
        content: data.content,
        senderId: this.userData.id || null,
        sender: this.userData || null,
      })
      this.io.emit('sendMessage', data)
    },
    async setUserData() {
      const res: any = await getUserInfo()
      if (res.success) {
        this.userData = res.data
        // 获取用户信息后 初始化ws
        this.initIo()
      }
    },
    syncsetUserData(data: any) {
      Object.assign(this.userData, data)
    },
    async getFriend() {
      const res: any = await getFriendList()
      if (res.success) {
        this.friendList = res.data
        return res.data
      }
    },
    async getMessages(data: any) {
      const res: any = await getMessage(data)
      if (!res.isbottom) {
        this.messageList.unshift(...res.data.data.reverse())
      }
      return res.data
    },
    async addMessage() {},
    messageListDown() {
      try {
        const scrollableElement = document.getElementById('content')
        scrollableElement.scrollTop = scrollableElement?.scrollHeight
      } catch (err) {}
    },
    setCurrentUserInfo(data: messageSenderType) {
      this.currentUserInfo = data
    },
    async getDynamicList(data: any) {
      let res: any = []
      if (data.status === 'public') {
        res = await getdynamic_public(data)
      } else {
        res = await getdynamic_friend(data)
      }
      this.dynamicList = res.data
    },
    uptateDynamicType(type: any) {
      this.dynamicType = type
    },
    setPrimary_color(value: string) {
      this.primaryColor = value
      localStorage.setItem('primaryColor', value)
      document.documentElement.style.setProperty('--van-primary-color', value)
    },
  },
})
