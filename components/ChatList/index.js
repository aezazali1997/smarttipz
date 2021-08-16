import React from 'react'
import ChatCard from '../ChatCard'
import Searchbar from '../Searchbar';
import { isEmpty } from 'lodash';

const ChatList = ({ testimonialVideo }) => {
    return (
        <div className="flex flex-col h-full w-full lg:max-w-sm bg-gray-100 p-5 px-3 space-y-3">
            <Searchbar />
            <div className="flex-1 flex-col w-full space-y-3 overflow-y-auto px-3">
                {
                    testimonialVideo && !isEmpty(testimonialVideo) ?
                        testimonialVideo.map(({ image, description, name }, index) => (
                            <ChatCard
                                key={index}
                                image={image}
                                name={name}
                                message={description}
                                containerStyle={`w-full mx-auto rounded-lg cursor-pointer`}
                                cardStyle={`flex items-center space-x-1 bg-white rounded-lg px-3 `}
                                imgStyle={`h-12 w-12 rounded-full object-cover md:w-12`}
                                contentStyle={`py-2 px-3 w-full`}
                                headerStyle={`flex justify-between items-center`}
                                messageStyle={`text-sm text-black w-60 overflow-ellipsis whitespace-nowrap overflow-hidden`}
                            />


                        ))
                        :
                        <p className="text-center text-gray-500 h-full justify-center items-center w-full flex">No chats</p>
                }
            </div>
        </div>
    )
}

export default ChatList
