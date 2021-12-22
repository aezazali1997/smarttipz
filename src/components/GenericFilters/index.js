import React from 'react';
import { faAddressCard, faLayerGroup, faPhotoVideo, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GenericFilters = ({ _HandleActiveGenericFilter, activeGenericFilter, category,
    _ChangeCategoryFilter }) => {
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
            {
                Data.map(({ icon, name }, index) => (
                    <div
                        key={index}
                        onClick={() => _HandleActiveGenericFilter(name)}
                        className={`flex space-x-3 px-2 py-2 w-full items-center rounded-md ${activeGenericFilter === name && 'bg-gray-100'
                            } hover:bg-gray-100 cursor-pointer`}>
                        <div className=" bg-gray-300 rounded-full w-10 h-10 p-2 flex items-center justify-center">
                            <FontAwesomeIcon
                                icon={icon}
                                className={`text-xl ${activeGenericFilter === name && 'text'}`}
                            />
                        </div>
                        <h4 className="font-semibold ">{name}</h4>
                    </div>
                ))}
            <div className="flex items-center justify-center space-x-3 px-2 py-2 ">
                <div className=" bg-gray-300 rounded-full p-2 w-10 h-10 flex items-center justify-center">
                    <FontAwesomeIcon
                        icon={faLayerGroup}
                        className={`text-xl ${category && 'text'}`}
                    />
                </div>
                <div className={`floating-input relative z-0 w-full mt-2`}>
                    <select
                        type='select'
                        id='category'
                        name='category'
                        value={category}
                        className='border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3 h-12 cursor-pointer'
                        onChange={(e) => _ChangeCategoryFilter(e)}
                        placeholder="name@example.com"
                    >
                        <option value="">Select Video Category...</option>
                        <option value="Category1">Category 1</option>
                        <option value="Category2">Category 2</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500 pointer-events-none" width="19.524" height="19.524" viewBox="0 0 19.524 19.524">
                            <path id="Icon_ionic-ios-arrow-dropdown-circle" data-name="Icon ionic-ios-arrow-dropdown-circle" d="M3.375,13.137a9.762,9.762,0,0,0,19.524,0c0-3.656-5.248-8.658-5.248-8.658a16.252,16.252,0,0,0-4.514-1.1A9.76,9.76,0,0,0,3.375,13.137ZM16.943,11.1s.929-.352,1.281,0a.9.9,0,0,1,.263.638.91.91,0,0,1-.268.643l-4.426,4.412a.9.9,0,0,1-1.248-.028L8.054,12.287a.906.906,0,0,1,1.281-1.281l3.806,3.844Z" transform="translate(-3.375 -3.375)" fill="#6d6d6d" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenericFilters;
