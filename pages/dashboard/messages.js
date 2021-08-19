/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { MobileInbox, WebInbox } from '../../components';
import socket from '../../utils/socket';
import { parseCookies } from 'nookies';


let data = [];

const Messages = () => {

    const { username } = parseCookies();

    const [loading, isLoading] = useState(true);
    const [message, setMessage] = useState('')
    const [userList, setUserList] = useState([])
    const [selected, setSelected] = useState({});

    let _EnableLoading = () => {
        isLoading(true);
    }
    let _DisableLoading = () => {
        isLoading(false);
    }



    useEffect(() => {
        _EnableLoading();
        socket.auth = { username };
        socket.connect();
        socket.on('users', ({ users }) => {
            data = users;
        })
        setTimeout(function () {
            console.log("data", data);
            setUserList(userList => userList = data);
            _DisableLoading(false);
        }, 4000);
    }, []);

    useEffect(() => { }, [userList]);

    function handleOnEnter(text) {
        console.log('enter', text)
        socket.emit("private message", { message: text, to: selected?.id });
        socket.on('private message', (res) => {
            console.log('res', res);
            setMessageList([...userList, res])
        })
    }

    let _OnSelect = (id, name, picture) => {
        if (selected?.id !== id) {
            const data = {
                id,
                name,
                picture
            }
            setSelected(data);
        }
    }
    let goBackToUserList = () => {
        setSelected({});
    }

    return (
        <div className="h-screen flex flex-col">
            <Helmet>
                <title>Messaging | Smart Tipz</title>
            </Helmet>
            {/* <div className="hidden lg:flex w-full items-center py-5 px-5 shadow-md z-10">
                <p className="text-xl font-semibold ">Messages</p>
            </div> */}
            <main className="hidden lg:flex flex-col lg:flex-row w-full h-screen ">
                <WebInbox
                    loading={loading}
                    userList={userList}
                    _OnSelect={_OnSelect}
                    selected={selected}
                    goBackToUserList={goBackToUserList}
                    message={message}
                    setMessage={setMessage}
                    handleOnEnter={handleOnEnter}
                />

            </main>
            <main className="lg:hidden flex flex-col lg:flex-row w-full h-screen overflow-y-auto">
                <MobileInbox
                    userList={userList}
                    _OnSelect={_OnSelect}
                    selected={selected}
                    goBackToUserList={goBackToUserList}
                    message={message}
                    setMessage={setMessage}
                    handleOnEnter={handleOnEnter}
                />

            </main>
        </div>
    )
}

export default Messages;
