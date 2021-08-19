import { io } from "socket.io-client";

const URL =
    // 'https://f29fe445605d.ngrok.io';
    "https://smart-tipz-chat.herokuapp.com";
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
    console.log('args', args);
})

export default socket;