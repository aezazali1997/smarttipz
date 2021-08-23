import { io } from "socket.io-client";

const URL =
    // 'https://2df1-115-186-189-40.ngrok.io';
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