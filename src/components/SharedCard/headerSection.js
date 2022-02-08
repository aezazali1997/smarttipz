/* eslint-disable @next/next/no-img-element */
import React from 'react'

const HeaderSection = ({ Share, _HandleGotoUserProfile, UserId }) => {

    return (
        <div className="flex w-full py-2 px-2 justify-between space-x-2">
            <div className="flex space-x-2">
                <img
                    src={Share?.User?.picture ||
                        "https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"}
                    className="rounded-full w-10 h-10 object-cover"
                    alt="avatar"></img>
                <div className="flex flex-col w-full">
                    <div className='flex w-full items-center'>
                        <p
                            onClick={() => _HandleGotoUserProfile(Share?.User?.id, Share?.User?.username)}
                            className="text-sm font-bold font-sans hover:underline cursor-pointer">
                            {Share?.User?.name}
                        </p>
                    </div>
                    <p className="text-xs text-gray-500">19h</p>
                </div>
            </div>
        </div>
    )
}

export default HeaderSection;
