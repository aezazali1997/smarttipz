/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Button } from '..';

const ProfileOverviewCard = ({ picture, name, email, _HandleGotoUserProfile }) => {
    return (
        <div
            className={`mx-auto max-w-lg shadow flex flex-col justify-center rounded-lg overflow-hidden
                bg-white space-y-2`}>
            <div className="flex w-full py-2 px-2 justify-between space-x-2">
                <div className="flex">
                    <img
                        src={picture || "https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"}
                        className="rounded-full w-16 h-10 object-cover"
                        alt="avatar"></img>
                    <div className="flex flex-col w-full">
                        <p
                            onClick={_HandleGotoUserProfile}
                            className="text-sm font-bold font-sans hover:underline cursor-pointer">
                            {name || 'Lorem Ipsum'}
                        </p>
                        <p className="text-xs text-gray-500">200 Followers</p>
                    </div>
                </div>
            </div>
            <div className="p-2">
                <Button
                    type="button"
                    childrens={'Follow'}
                    classNames={"px-3 py-2 flex w-full  justify-center items-center text-white w-28 text-sm btn rounded-md "}
                />
            </div>
        </div>
    )
}

export default ProfileOverviewCard;
