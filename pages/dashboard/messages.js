/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { ChatCard, Searchbar } from '../../components';
import testimonialVideo from '../../utils/testimonialSchema.json';
import InputEmoji from 'react-input-emoji'
import { isEmpty } from 'lodash';

const Messages = () => {

    const [message, setMessage] = useState('')

    function handleOnEnter(text) {
        console.log('enter', text)
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Helmet>
                <title>Messaging | Windswept</title>
            </Helmet>
            <div className="hidden lg:flex w-full justify-between items-center h-16 px-5 shadow-md z-10">
                <p className="text-xl font-semibold ">Messages</p>
            </div>
            <div className="flex flex-col lg:flex-row w-full">
                <div className="flex flex-col relative w-full lg:max-w-sm overflow-y-auto screen bg-gray-100 p-5 space-y-3">
                    <Searchbar />
                    {
                        !isEmpty(testimonialVideo) ?
                            testimonialVideo.map(({ image, description, name }) => (
                                <>
                                    <ChatCard
                                        image={image}
                                        name={name}
                                        message={description}
                                        containerStyle={`w-full mx-auto rounded-lg overflow-hidden  cursor-pointer`}
                                        cardStyle={`flex items-center space-x-1 bg-white rounded-lg px-3 `}
                                        imgStyle={`h-12 w-12 rounded-full object-cover md:w-12`}
                                        contentStyle={`py-2 px-3 w-full`}
                                        headerStyle={`flex justify-between items-center`}
                                        messageStyle={`text-sm text-black w-60 overflow-ellipsis whitespace-nowrap overflow-hidden`}
                                    />
                                    <ChatCard
                                        image={image}
                                        name={name}
                                        message={description}
                                        containerStyle={`w-full mx-auto rounded-lg overflow-hidden  cursor-pointer`}
                                        cardStyle={`flex items-center space-x-1 bg-white rounded-lg px-3 `}
                                        imgStyle={`h-12 w-12 rounded-full object-cover md:w-12`}
                                        contentStyle={`py-2 px-3 w-full`}
                                        headerStyle={`flex justify-between items-center`}
                                        messageStyle={`text-sm text-black w-60 overflow-ellipsis whitespace-nowrap overflow-hidden`}
                                    />
                                    <ChatCard
                                        image={image}
                                        name={name}
                                        message={description}
                                        containerStyle={`w-full mx-auto rounded-lg overflow-hidden  cursor-pointer`}
                                        cardStyle={`flex items-center space-x-1 bg-white rounded-lg px-3 `}
                                        imgStyle={`h-12 w-12 rounded-full object-cover md:w-12`}
                                        contentStyle={`py-2 px-3 w-full`}
                                        headerStyle={`flex justify-between items-center`}
                                        messageStyle={`text-sm text-black w-60 overflow-ellipsis whitespace-nowrap overflow-hidden`}
                                    />
                                </>
                            ))
                            :
                            <p className="text-center text-gray-500 h-full justify-center items-center w-full flex">No chats</p>
                    }
                </div>
                {
                    !isEmpty(testimonialVideo) && (
                        <div className="flex flex-col w-full p-5 border">
                            <div className='flex items-center space-x-3'>
                                <img className="inline object-cover w-12 h-10 rounded-full z-40" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image" />
                                <div className="flex flex-col w-full mb-2">
                                    <h1 className="text-xl text-bold font-sans">Reena Thomas</h1>
                                    {/* <h1 className="text-sm text-gray-600 font-sans"><span className="inline-block w-2 h-2 mr-2 bg-green-600 rounded-full"></span>Active Now</h1> */}
                                    <h1 className="text-sm text-gray-600 font-sans">Just now</h1>
                                </div>
                            </div>
                            <hr />
                            <div className="flex flex-col screen overflow-y-auto items-start justify-end space-y-3 mt-6">
                                {
                                    testimonialVideo.map(({ image, description, name }) => (
                                        <>
                                            <ChatCard
                                                image={image}
                                                name={name}
                                                message={description}
                                                containerStyle={`max-w-sm overflow-hidden`}
                                                cardStyle={`flex items-center space-x-3`}
                                                imgStyle={`h-10 w-16 rounded-full object-cover md:w-10`}
                                                contentStyle={`py-2 px-4 rounded-3xl bg-gray-100`}
                                                headerStyle={`hidden`}
                                                messageStyle={`text-sm text-black`}
                                            />
                                            <ChatCard
                                                image={image}
                                                name={name}
                                                message={description}
                                                containerStyle={`max-w-sm ml-50 lg:ml-72 overflow-hidden`}
                                                cardStyle={` flex items-center space-x-3`}
                                                imgStyle={` hidden h-10 w-16 rounded-full object-cover md:w-10`}
                                                contentStyle={`py-2 px-4 rounded-3xl bg-gray-100`}
                                                headerStyle={`hidden`}
                                                messageStyle={`text-sm text-black`}
                                            />
                                        </>
                                    ))
                                }

                            </div>
                            <div className="flex w-full mt-4">
                                <InputEmoji
                                    value={message}
                                    onChange={setMessage}
                                    cleanOnEnter
                                    onEnter={handleOnEnter}
                                    placeholder="Type your message..."
                                />
                            </div>
                        </div>
                    )}

            </div>


        </div>
    )
}

export default Messages;
