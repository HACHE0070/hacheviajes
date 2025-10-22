import { io as socketIo } from 'socket.io-client';
export const socket = socketIo(import.meta.env.VITE_WS_URL || 'http://localhost:4000', {
    transports: ['websocket']
});
