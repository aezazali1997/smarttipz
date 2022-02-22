/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { parseCookies } from 'nookies';
import socket from 'utils/socket';
import { MobileInbox, WebInbox } from 'src/components';
import axiosInstance from 'src/APIs/axiosInstance';


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
        axiosInstance.threads().then(({ data: { data } }) => {
            // console.log("data", data);
            setUserList(userList => userList = data);
            _DisableLoading(false);
        }).catch(e => {
            console.log(e.response.data.message);
        })
        return () => {
            socket.emit('Disconnect');
        }
    }, []);

    useEffect(() => {
        // console.log("In Listener effect")
        socket.on('connected', ({ data: { id }, message }) => {
            let copyArray = [...userList];
            copyArray = copyArray.map((item, i) => {
                if (item.id !== id) return item;
                item.connected = true;
                return item;
            })
            setUserList(copyArray);
        });

        socket.on('user disconnected', (userID) => {
            let copyArray = [...userList];
            copyArray = copyArray.map((item, i) => {
                if (item.id !== userID) return item;
                item.connected = false;
                return item;
            })
            setUserList(copyArray);
            console.log('user Disconnected')
        });

        socket.on('newUser', (res) => {
            let copyArray = [...userList];
            copyArray = copyArray.filter(user => user.id !== res.id);
            let updatedArray = [res, ...copyArray]
            setUserList(updatedArray);
        })
    }, [userList]);

    let _OnSelect = (id, name, picture) => {
        if (selected?.id !== id) {
            axiosInstance.msgRead({ recieverID: id })
                .then(({ data: { data } }) => {
                    let copyArray = [...userList];
                    copyArray = copyArray.filter(user => user.id !== data.id);
                    let updatedArray = [data, ...copyArray]
                    setUserList(updatedArray);
                })
                .catch(e => {
                    console.log(e);
                })
            const data = {
                id,
                name,
                picture
            }
            setSelected(data);
        }
    }

    let goBackToUserList = (id) => {
        socket.emit('leaveRoom', ({ id }));
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


export const getServerSideProps = async (context) => {
    const { token } = parseCookies(context);
    if (!token)
        return {
            redirect: {
                permanent: false,
                destination: "/auth/login",
            },
            props: {},
        };
    else {
        return { props: {} }
    }
}

export default Messages;
