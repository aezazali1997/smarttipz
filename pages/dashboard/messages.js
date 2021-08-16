/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { ChatList, MessageWindow } from '../../components';
import testimonialVideo from '../../utils/testimonialSchema.json';

const Messages = () => {

    const [message, setMessage] = useState('')

    function handleOnEnter(text) {
        console.log('enter', text)
    }

    return (
        <div className="h-screen flex flex-col">
            <Helmet>
                <title>Messaging | Smart Tipz</title>
            </Helmet>
            {/* <div className="hidden lg:flex w-full items-center py-5 px-5 shadow-md z-10">
                <p className="text-xl font-semibold ">Messages</p>
            </div> */}
            <main className="flex flex-col lg:flex-row w-full h-screen">

                <ChatList
                    testimonialVideo={testimonialVideo}
                />

                <MessageWindow
                    testimonialVideo={testimonialVideo}
                    message={message}
                    setMessage={setMessage}
                    handleOnEnter={handleOnEnter}
                />

            </main>
        </div>
    )
}

export default Messages;
