import { request } from '@/utils/request'

export function getdynamic_public(data: any) {
  return request({
    url: '/dynamic/query_public',
    method: 'post',
    custom: 'no_loading',
    data,
  })
}
export function getdynamic_friend(data: any) {
  return request({
    url: '/dynamic/query',
    method: 'post',
    custom: 'no_loading',
    data,
  })
}
export function createdynamic(data: any) {
  return request({
    url: '/dynamic/create',
    method: 'post',
    data,
  })
}
export function removedynamic(id: number) {
  return request({
    url: `/dynamic/${id}`,
    method: 'delete',
  })
}
