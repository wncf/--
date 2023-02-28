import { closeToast, showFailToast, showLoadingToast, showSuccessToast } from 'vant'

export const LoadingToast = () =>
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  })
export const clearToast = () =>
  setTimeout(() => {
    closeToast()
  }, 200)
export const FailToast = (errorMessage: string) =>
  showFailToast({
    message: errorMessage,
    forbidClick: true,
    duration: 2000,
  })
export const SuccessToast = (successMessage: string) =>
  showSuccessToast({
    message: successMessage,
    forbidClick: true,
    duration: 1000,
  })
export const syncLoadingToast = async (promises: any[]) => {
  const Toast = showLoadingToast({
    message: '正在初始化...',
    forbidClick: true,
    duration: 0,
  })
  for (const promise of promises) {
    try {
      Toast.message = promise.message
      await promise.carry()
    } catch (error) {
      closeToast()
      return
    }
  }
}
