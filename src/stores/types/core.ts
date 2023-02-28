export type gender = '男' | '女' | '未知'
export interface userType {
  avatar_url: string
  email: string
  id: number
  autograph: string
  gender: gender
  rid?: number
  rids?: { role_name: string }
  user_name: string
  nickName: string
}
export interface friend {
  id: number
  autograph: string
  nickName: string
  avatar_url: string
  gender: string
  create_at?: string
  update_at?: string
  online?: boolean
}
export interface message {
  id: number
  senderId?: number
  content: string
  sender?: messageSenderType
}
export type messageSenderType = {
  id: number
  nickName: string
  autograph: string
  gender: string
  create_at?: string
  avatar_url: string
  rid?: number
}
export type online_type = {
  avatar_url: string
  sub: number
  nickName: string
}
export type dynamic_type = {
  id: number
  userId: number
  content: string
  status: string
  goodNumber: number
  create_at?: string
  sender: messageSenderType
}
