import { request } from '@/utils/request'
import type { createType } from './types/auth'

// 调用测试
export function getFriendList() {
  return request({
    url: '/friend/list',
    method: 'get',
    custom: 'no_loading',
  })
}
export function addFriend(data: createType) {
  return request({
    url: '/friend/create',
    method: 'post',
    data,
  })
}
export function removeFriend(id: number) {
  return request({
    url: `/friend/${id}`,
    method: 'delete',
  })
}
