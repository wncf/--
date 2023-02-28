import { request } from '@/utils/request'
import type { user_Login_type, user_register_type } from './types/auth'

// 调用测试
export function register(data: user_register_type) {
  return request({
    url: '/auth/register',
    method: 'post',
    data: data,
  })
}

export function login(data: user_Login_type) {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}
export function getUserInfo() {
  return request({
    url: '/auth/info',
    method: 'get',
    custom: 'no_loading',
  })
}
export function uploadImag(data: any) {
  return request({
    url: '/upload/image',
    method: 'post',
    data: data,
    Headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
export function updateUserInfo(data: any) {
  return request({
    url: '/user/update',
    method: 'post',
    data: data,
  })
}
export function getSms(data: { email: string }) {
  return request({
    url: '/email/sendCode',
    method: 'post',
    data: data,
  })
}
