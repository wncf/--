import { clearToken, getToken } from './core/utils'
import { clearToast, FailToast, LoadingToast } from '@/components/core/Toast'
import axios from 'axios'
import { showFailToast, showNotify } from 'vant'
import { coreStore } from '@/stores/core'
import { useRouter } from 'vue-router'
export const request = (options: any) => {
  return new Promise((resolve, reject) => {
    const service = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 80000, // request timeout
    })
    // request interceptor
    service.interceptors.request.use(
      (config) => {
        console.log('hellow')

        if (!config['custom']) {
          LoadingToast()
        }
        // token
        let token = getToken()
        if (token) {
          config.headers.Authorization = 'Bearer ' + token
          // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
          // config.headers.Authorization = `Bearer +${token}`
        }
        return config
      },
      (error) => {
        // Do something with request error
        console.log('出错啦', error) // for debug
        Promise.reject(error)
      },
    )

    // response interceptor
    service.interceptors.response.use(
      (response: any) => {
        if (response.status === 200 || response.status === 201) {
          clearToast()
        }
        return response.data
      },
      (error) => {
        clearToast()

        // 超出 2xx 范围的状态码都会触发该函数。
        let errorName = ''
        const core = coreStore()
        if (error.message === 'Network Error') errorName = '网络错误'
        switch (error.response?.data.statusCode) {
          case 401:
            errorName = '登录过期，请重新登录,1秒后自动跳转到首页'
            clearToken()
            setTimeout(() => {
              window.location.replace('/chat')
            }, 1000)
            break
          case 405:
            errorName = '文件类型错误'
            break
          case 413:
            errorName = '文件过大，请上传低于2m的文件'
            break
          case 422:
            errorName = error.response?.data.message[0]
        }
        FailToast(errorName)
        return Promise.reject(error)
      },
    )
    // 请求处理
    service(options)
      .then((res: any) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default request
