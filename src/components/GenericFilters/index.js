import React from 'react';
import { faAddressCard, faPhotoVideo, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GenericFilters = ({ _HandleActiveGenericFilter, activeGenericFilter }) => {
    const Data = [
        {
            icon: faPhotoVideo,
            name: 'All'
        },
        {
            icon: faAddressCard,
            name: 'Posts'
        },
        {
            icon: faUserFriends,
            name: 'Profile'
        }
    ];

    return (
        <div className="flex flex-col w-full bg-white rounded-lg shadow py-4 px-3">
            {Data.map(({ icon, name }, index) => (
                <div
                    key={index}
                    onClick={() => _HandleActiveGenericFilter(name)}
                    className={`flex space-x-3 px-2 py-2 w-full items-center rounded-md ${activeGenericFilter === name && 'bg-gray-100'
                        } hover:bg-gray-100 cursor-pointer`}>
                    <div className=" bg-gray-300 rounded-full p-2">
                        <FontAwesomeIcon
                            icon={icon}
                            className={`text-xl ${activeGenericFilter === name && 'text'}`}
                        />
                    </div>
                    <h4 className="font-semibold ">{name}</h4>
                </div>
            ))}
        </div>
    );
};

export default GenericFilters;
