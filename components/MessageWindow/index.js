/* eslint-disable @next/next/no-img-element */
import axiosInstance from 'APIs/axiosInstance';
import { scrollToBottom } from 'helpers';
import { isEmpty } from 'lodash';
import { parseCookies } from 'nookies';
import React, { useEffect, useRef, useState } from 'react'
import socket from '../../utils/socket';
import ChatCard from '../ChatCard';
import EmojiInput from '../EmojiInput';

const MessageWindow = ({ message, setMessage, selected, goBackToUserList }) => {
    const { username } = parseCookies();
    const [userMessages, setMessages] = useState([]);
    const [loading, isLoading] = useState(true);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (selected) {
            isLoading(true);
            const data = {
                id: selected?.id
            }
            axiosInstance.privateChat(data).then(({ data: { error, data, message } }) => {
                setMessages(data);
                isLoading(false);
                scrollToBottom(messagesEndRef);
            }).catch(e => {
                console.log(e.response.data.message);
            })
        }
    }, [selected])

    useEffect(() => {
        console.log('updated');
        socket.on('recieveMessage', (res) => {
            console.log('res', res);
            let copyArray = [...userMessages];
            console.log({ copyArray });
            let updatedArray = [...copyArray, res]
            console.log({ updatedArray });
            setMessages(updatedArray);
            scrollToBottom(messagesEndRef);
        })
    }, [userMessages]);

    let handleOnEnter = (text) => {
        console.log('sentText', text);
        if (text !== '') {
            socket.emit("sendMessage", { message: text, to: selected?.id });
        }
    }

    return (
        <>
            <header className="flex flex-col w-full p-5 pb-2">
                <div onClick={goBackToUserList} className='lg:hidden flex sticky top-0 lg:relative bg-white items-center w-full space-x-5 mb-2'>
                    <span className="flex border rounded-full hover:shadow-md p-1 cursor-pointer">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <div className="flex items-center w-full space-x-3 mb-2">
                        <img className="inline object-cover w-12 h-10 rounded-full"
                            src={selected?.picture || "https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"}
                            alt="Profile image"
                        />
                        <div className="flex flex-col w-full ">
                            <h1 className="text-md md:text-lg lg:text-xl text-bold font-sans">{selected?.name}</h1>
                            {/* <h1 className="text-sm text-gray-600 font-sans"><span className="inline-block w-2 h-2 mr-2 bg-green-600 rounded-full"></span>Active Now</h1> */}
                            {/* <h1 className="text-sm text-gray-600 font-sans">Just Now</h1> */}
                        </div>
                    </div>
                </div>
                <div className='hidden lg:flex items-center space-x-3 mb-2'>
                    <img className="inline object-cover w-12 h-10 rounded-full z-40" src={selected?.picture || "https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"} alt="Profile image" />
                    <div className="flex flex-col w-full">
                        <h1 className="text-xl text-bold font-sans">{selected?.name}</h1>
                        {/* <h1 className="text-sm text-gray-600 font-sans"><span className="inline-block w-2 h-2 mr-2 bg-green-600 rounded-full"></span>Active Now</h1> */}
                        {/* <h1 className="text-sm text-gray-600 font-sans">Just Now</h1> */}
                    </div>
                </div>
                <hr />
                <div className="flex h-screen lg:h-auto lg:flex-1 flex-col overflow-y-auto w-full space-y-3 mt-6 px-3 border-b">
                    {

                        !isEmpty(userMessages) && (
                            loading ?
                                <div className="flex flex-col w-full items-center justify-center">
                                    <div className="self-center ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>
                                    <p className="text-sm text-center text-gray-400">Loading Messages</p>
                                </div>
                                :
                                <>
                                    {
                                        userMessages.map(({ to, message, time }, index) => (
                                            to !== selected?.id ?
                                                <div key={index} className="mt-auto">
                                                    <ChatCard
                                                        image={selected?.picture}
                                                        name={selected?.name}
                                                        message={message}
                                                        time={time}
                                                        containerStyle={`max-w-sm`}
                                                        cardStyle={`flex items-center space-x-3`}
                                                        imgStyle={`h-10 w-16 rounded-full object-cover md:w-10`}
                                                        contentStyle={`py-2 px-4 rounded-3xl bg-gray-100`}
                                                        headerStyle={`flex items-center justify-between space-x-3`}
                                                        messageStyle={`text-sm text-black`}
                                                    />
                                                </div> :
                                                <div key={index} className="senderChat mt-auto">
                                                    <ChatCard
                                                        name={username}
                                                        message={message}
                                                        time={time}
                                                        containerStyle={`max-w-sm`}
                                                        cardStyle={` flex items-center space-x-3`}
                                                        imgStyle={` hidden h-10 w-16 rounded-full object-cover md:w-10`}
                                                        contentStyle={`py-2 px-4 rounded-3xl bg-gray-100`}
                                                        headerStyle={`flex items-center justify-between space-x-3`}
                                                        messageStyle={`text-sm text-black`}
                                                    />
                                                </div>

                                        ))
                                    }
                                    <div ref={messagesEndRef} />
                                </>
                        )
                    }

                </div>
                <div className="flex w-full mt-2">
                    <EmojiInput
                        message={message}
                        setMessage={setMessage}
                        handleOnEnter={handleOnEnter}
                    />
                </div>
            </header>
        </>
    )
}

export default MessageWindow;
