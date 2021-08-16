/* eslint-disable @next/next/no-img-element */
import { isEmpty } from 'lodash';
import React from 'react'
import ChatCard from '../ChatCard';
import EmojiInput from '../EmojiInput';

const MessageWindow = ({ testimonialVideo, message, setMessage, handleOnEnter }) => {
    return (
        <>
            {
                testimonialVideo && !isEmpty(testimonialVideo) && (
                    <div className="flex flex-col w-full p-5">
                        <div className='flex items-center space-x-3'>
                            <img className="inline object-cover w-12 h-10 rounded-full z-40" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image" />
                            <div className="flex flex-col w-full mb-2">
                                <h1 className="text-xl text-bold font-sans">Reena Thomas</h1>
                                {/* <h1 className="text-sm text-gray-600 font-sans"><span className="inline-block w-2 h-2 mr-2 bg-green-600 rounded-full"></span>Active Now</h1> */}
                                <h1 className="text-sm text-gray-600 font-sans">Just now</h1>
                            </div>
                        </div>
                        <hr />
                        <div className="flex-1 flex-col items-start overflow-y-auto w-full space-y-3 mt-6 px-3">
                            {
                                testimonialVideo.map(({ image, description, name }) => (
                                    <>
                                        <ChatCard
                                            image={image}
                                            name={name}
                                            message={description}
                                            containerStyle={`max-w-sm`}
                                            cardStyle={`flex items-center space-x-3`}
                                            imgStyle={`h-10 w-16 rounded-full object-cover md:w-10`}
                                            contentStyle={`py-2 px-4 rounded-3xl bg-gray-100`}
                                            headerStyle={`hidden`}
                                            messageStyle={`text-sm text-black`}
                                        />
                                        <div className="senderChat">
                                            <ChatCard
                                                image={image}
                                                name={name}
                                                message={description}
                                                containerStyle={`max-w-sm`}
                                                cardStyle={` flex items-center space-x-3`}
                                                imgStyle={` hidden h-10 w-16 rounded-full object-cover md:w-10`}
                                                contentStyle={`py-2 px-4 rounded-3xl bg-gray-100`}
                                                headerStyle={`hidden`}
                                                messageStyle={`text-sm text-black`}
                                            />
                                        </div>

                                    </>
                                ))
                            }

                        </div>
                        <div className="flex w-full mt-4">
                            <EmojiInput
                                message={message}
                                setMessage={setMessage}
                                handleOnEnter={handleOnEnter}
                            />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default MessageWindow;
