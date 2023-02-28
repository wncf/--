import { io } from 'socket.io-client'
export const initSocket = (token: string) => {
  const URL = import.meta.env.VITE_BASE_URL_WS
  let socket = io(URL, {
    transports: ['websocket', 'polling'],
    autoConnect: true,
    auth: {
      token: token,
    },
  })
  socket.on('connect', () => {
    console.log(socket.connected) // true
  })
  return {
    socket,
  }
}
