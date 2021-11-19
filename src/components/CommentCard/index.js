/* eslint-disable @next/next/no-img-element */
import React from 'react'

const CommentCard = ({ image, user, comment, time }) => {
    return (

        <div className="flex">
            <img
                src="https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"
                className="rounded-full w-16 h-10 object-cover"
                alt="avatar"></img>
            <div className="flex flex-col w-full">
                <p
                    // onClick={() => _HandleGotoUserProfile(UserId, User?.username)}
                    className="text-sm font-bold font-sans hover:underline cursor-pointer">
                    {'LoremIpsum'}
                </p>
                <p className="text-xs text-gray-500">19h</p>
                <p className="text-xs md:text-sm">{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s`}</p>
            </div>
        </div>
    )
}

export default CommentCard
