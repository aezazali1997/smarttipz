import React from 'react'
import { Helmet } from 'react-helmet';

const Messages = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Helmet>
                <title>Messaging | Windswept</title>
            </Helmet>
            <div className="flex w-full justify-between items-center h-16 px-3 shadow-md">
                <p className="text-md font-medium ">Messages</p>
            </div>
        </div>
    )
}

export default Messages;
