import { ref } from 'vue'
const defaultImgUrl = import.meta.env.VITE_BASE_URL
import dayjs from 'dayjs'
export const getToken = (): string | null => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  if (token) {
    return token
  } else {
    return null
  }
}
export const setToken = (token: string, isremember: Boolean) => {
  if (isremember) {
    localStorage.setItem('token', token)
  } else {
    sessionStorage.setItem('token', token)
  }
}
export const clearToken = () => {
  sessionStorage.removeItem('token')
  localStorage.removeItem('token')
}
export const ifToekn = () => {
  return Boolean(localStorage.getItem('token') || sessionStorage.getItem('token'))
}
export const checkimageUrl = (url: string) => {
  return `${defaultImgUrl}/uploads/${url}`
}

export const dateFormat = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}
export const getPrimary_color = () => {
  return localStorage.getItem('primaryColor') || '#8F8FFC'
}
