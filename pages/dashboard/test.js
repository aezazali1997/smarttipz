
import { useEffect } from "react";
import { io } from "socket.io-client";


const Test = () => {

    useEffect(() => {

        const URL = "https://smart-tipz-chat.heroku.app";
        const socket = io(URL, { autoConnect: false });
        socket.auth = { username: 'PersonalUser' };
        socket.connect();
        socket.emit("message", "Hello World");

    })

    return (
        <div className="min-h-screen w-full">

        </div>
    )
}

export default Test;