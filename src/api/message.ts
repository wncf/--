import { request } from '@/utils/request'

export function getMessage(data: any) {
  return request({
    url: '/message/list',
    method: 'post',
    custom: 'no_loading',
    data,
  })
}
