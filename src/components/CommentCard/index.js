/* eslint-disable @next/next/no-img-element */
import React from 'react'
import moment from 'moment';
import { Spinner } from '..';

const CommentCard = ({ data, _HandleGotoUserProfile, loading }) => {

    return (
        <>
            {
                loading ?
                    <div className="flex justify-center items-center w-full">
                        <Spinner />
                    </div>
                    :
                    data.map(({ User: { id, picture, accountType, name, showUsername, showName, username, createdAt }, message }, index) => (
                        <div key={index} className="flex space-x-2  border rounded-lg px-3 py-1">
                            <img
                                src={picture || "https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"}
                                className="rounded-full w-10 h-10 object-cover"
                                alt="avatar"></img>
                            <div className="flex flex-col w-full ">
                                <p
                                    onClick={() => _HandleGotoUserProfile(id, username)}
                                    className="text-sm font-bold font-sans hover:underline cursor-pointer">
                                    {accountType === 'Personal' ? showName ? name : showUsername ? username : '' : name}
                                </p>
                                <p className="text-xs text-gray-500">{moment(createdAt).format('h:mm a')}</p>
                                <p className="text-xs  md:text-sm break-words">{message}</p>
                            </div>
                        </div>
                    ))
            }
        </>
    )
}

export default CommentCard
