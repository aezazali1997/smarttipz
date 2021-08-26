/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { parseCookies } from 'nookies';
import socket from 'utils/socket';
import { MobileInbox, WebInbox } from 'components';
import axiosInstance from 'APIs/axiosInstance';


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
        socket.auth = { username, otherUserID: null };
        socket.connect();
        socket.on('connected', (res) => {
            console.log(res);
        })
        axiosInstance.threads().then(({ data: { error, data, message } }) => {
            console.log("data", data);
            setUserList(userList => userList = data);
            _DisableLoading(false);
        }).catch(e => {
            console.log(e.response.data.message);
        })
    }, []);

    useEffect(() => {

        socket.on('newUser', (res) => {
            console.log('res', res);
            let copyArray = [...userList];
            console.log({ copyArray });
            let updatedArray = [...copyArray, res]
            console.log({ updatedArray });
            setUserList(updatedArray);
        })

    }, [userList]);

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
                />
            </main>
            <main className="lg:hidden flex flex-col lg:flex-row w-full h-screen overflow-y-auto">
                <MobileInbox
                    userList={userList}
                    loading={loading}
                    _OnSelect={_OnSelect}
                    selected={selected}
                    goBackToUserList={goBackToUserList}
                    message={message}
                    setMessage={setMessage}
                />

            </main>
        </div>
    )
}

export default Messages;
