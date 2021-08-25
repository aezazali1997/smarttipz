import { io } from "socket.io-client";

const URL =
    // 'http://localhost:3001';
    "https://smart-tipz-chat.herokuapp.com";
const socket = io(URL, {
    autoConnect: false,
    transports: ['websocket'],
    reconnectionAttempts: 15
});

socket.onAny((event, ...args) => {
    console.log('args', args);
    console.log('events', event);
})

export default socket;