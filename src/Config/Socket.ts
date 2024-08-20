import {io} from 'socket.io-client'

const socket =io(import.meta.env.VITE_BACKEND_PORT)

export default socket