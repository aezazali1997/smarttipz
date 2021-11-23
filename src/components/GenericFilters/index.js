import React from 'react'
import { faAddressCard, faPhotoVideo, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const GenericFilters = () => {
    return (
        <div className="flex flex-col w-full bg-white rounded-lg shadow py-4 px-3">
            <div className="flex space-x-3 px-2 py-2 w-full items-center rounded-md hover:bg-gray-100 cursor-pointer">
                <div className=" bg-gray-300 rounded-full p-2">
                    <FontAwesomeIcon icon={faPhotoVideo} className="text-xl" />
                </div>
                <h4 className="font-semibold ">All</h4>
            </div>
            <div className="flex space-x-3 px-2 py-2 w-full items-center rounded-md hover:bg-gray-100 cursor-pointer">
                <div className=" bg-gray-300 rounded-full p-2">
                    <FontAwesomeIcon icon={faAddressCard} className="text-xl" />
                </div>
                <h4 className="font-semibold ">Posts</h4>
            </div>
            <div className="flex space-x-3 px-2 py-2 w-full items-center rounded-md hover:bg-gray-100 cursor-pointer">
                <div className=" bg-gray-300 rounded-full p-2">
                    <FontAwesomeIcon icon={faUserFriends} className="text-xl" />
                </div>
                <h4 className="font-semibold ">Profile</h4>
            </div>
        </div>
    )
}

export default GenericFilters;
