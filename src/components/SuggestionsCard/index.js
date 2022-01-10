/* eslint-disable @next/next/no-img-element */
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Rating, VideoPlayer } from '..';
import { PostActionDropdown } from '../Dropdown';

const SuggestionCard = ({
    index,
    id,
    catalogue,
    UserId,
    isPost,
    name,
    videoType,
    videoCost,
    thumbnail,
    url,
    title,
    rating,
    views,
    width,
    User,
    _HandleCatalogue,
    _HandleDeleteVideo,
    _HandleGotoUserProfile,
    _HandleGotoVideoDetails
}) => {
    return (
        <>
            <div
                className={`${width} shadow flex flex-col justify-center rounded-lg overflow-hidden
                bg-white space-y-1`}>
                <div className="flex w-full py-1 px-2 justify-between space-x-2">
                    <div className="flex space-x-2">
                        <img
                            src={User?.picture ||
                                "https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"}
                            className="rounded-full w-10 h-10 object-cover"
                            alt="avatar"></img>
                        <div className="flex flex-col w-full">
                            <p
                                onClick={() => _HandleGotoUserProfile(UserId, User?.username)}
                                className="text-sm w-28 font-bold font-sans hover:underline whitespace-nowrap overflow-ellipsis overflow-hidden cursor-pointer">
                                {User?.name}
                            </p>
                            <p className="text-xs text-gray-500">19h</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <svg
                            className="w-6 h-6 text-gray-400 hover:text-yellow-500 cursor-pointer"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <div className="flex items-start justify-start">
                            <PostActionDropdown
                                _HandleCatalogue={() => _HandleCatalogue(id, catalogue)}
                                _HandleDeleteVideo={() => _HandleDeleteVideo(index, id)}
                                catalogue={catalogue}
                                ownerId={UserId}
                                isPost={isPost}
                            />
                        </div>
                    </div>
                </div>
                <p
                    onClick={() => _HandleGotoVideoDetails(id)}
                    className="px-5 text-sm max-w-sm hover:underline  cursor-pointer"
                >
                    {title}
                </p>
                <div className="suggestion-video-wrapper">
                    <VideoPlayer poster={thumbnail} src={url} />
                </div>
                {/* <img src="https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"
                className="w-full h-auto" alt="avatar"></img> */}

                <div className="flex justify-between w-full px-3 pb-1">
                    <span className="flex items-center z-0">
                        <Rating value={rating} isHalf={true} edit={false} />
                        &nbsp; <p className="text-xs"> Rating</p>
                    </span>
                    <span className="flex  items-center">
                        <svg
                            className="w-4 h-4 text"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        &nbsp;<p className="text-xs">{views} Views</p>
                    </span>
                </div>
                <div className="px-3 flex space-x-2 pb-2">
                    <div className="flex px-2 h-6 rounded-lg  background items-center justify-center">
                        <p className="text-white font-sm ">{videoType}</p>
                    </div>
                    <div className="flex px-2 h-6 rounded-lg  background items-center justify-center">
                        <p className="text-white font-sm ">{videoCost}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SuggestionCard;

