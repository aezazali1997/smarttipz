/* eslint-disable @next/next/no-img-element */
import React from 'react'
import ReactTooltip from 'react-tooltip'
import { Rating, VideoPlayer } from '..'
import { PostActionDropdown } from '../Dropdown'

const NewsfeedCard = ({ index, id, catalogue, _HandleDeleteVideo, _HandleCatalogue, UserId, isPost, name,
    thumbnail, url, title, rating, views, width, User }) => {
    return (
        <>
            <div className={`mx-auto ${width} shadow flex flex-col justify-center rounded-lg overflow-hidden
                bg-white space-y-2`}>
                <div className="flex w-full py-2 px-3 justify-between">
                    <div className="flex">
                        <img src="https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"
                            className="rounded-full w-16 h-10 object-cover" alt="avatar"></img>
                        <div className="flex flex-col w-full">
                            <p className="text-sm font-bold font-sans hover:underline cursor-pointer ">{User?.name}</p>
                            <p className="text-xs text-gray-500">19h</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-start">
                        <PostActionDropdown
                            _HandleCatalogue={() => _HandleCatalogue(id, catalogue)}
                            _HandleDeleteVideo={() => _HandleDeleteVideo(index, id)}
                            catalogue={catalogue}
                            ownerId={UserId}
                            isPost={isPost}
                        />
                    </div>
                </div>
                <p className="px-6 text-sm w-11/12 whitespace-nowrap overflow-ellipsis overflow-hidden">{title}</p>
                <div className="h-full w-full">
                    <VideoPlayer poster={thumbnail} src={url} />
                </div>
                {/* <img src="https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"
                className="w-full h-auto" alt="avatar"></img> */}

                <div className="flex justify-between w-full px-3">
                    <span className="flex w-full items-center">
                        <svg className="w-4 h-4 text" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                        &nbsp;<p className="text-xs">{views} Views</p></span>
                    <span className="flex justify-end w-full items-center z-0">
                        <Rating
                            value={rating}
                        />
                        &nbsp; <p className="text-xs"> Rating</p></span>
                </div>

                {/* {disclaimer && */}
                {/* <div className="flex justify-end px-3">
                   
                </div> */}
                {/* } */}
                <div className="flex flex-col w-full divide-y">
                    <div className="flex justify-between w-full px-3 py-2 rounded-b-lg">
                        <div className="space-x-2 flex">
                            <div className="flex space-x-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11.825" height="11.825" viewBox="0 0 11.825 11.825">
                                    <path id="Icon_awesome-thumbs-up" data-name="Icon awesome-thumbs-up" d="M2.4,5.173H.554A.554.554,0,0,0,0,5.728v5.543a.554.554,0,0,0,.554.554H2.4a.554.554,0,0,0,.554-.554V5.728A.554.554,0,0,0,2.4,5.173ZM1.478,10.9a.554.554,0,1,1,.554-.554A.554.554,0,0,1,1.478,10.9Zm7.391-9.02c0,.98-.6,1.529-.769,2.184H10.45a1.38,1.38,0,0,1,1.375,1.342,1.672,1.672,0,0,1-.449,1.136l0,0a1.929,1.929,0,0,1-.215,1.835,1.826,1.826,0,0,1-.378,1.727,1.226,1.226,0,0,1-.142,1.031c-.471.677-1.64.687-2.628.687H7.945a6.63,6.63,0,0,1-2.761-.733,3.635,3.635,0,0,0-1.216-.374.277.277,0,0,1-.272-.277V5.5a.277.277,0,0,1,.082-.2C4.692,4.4,5.086,3.446,5.836,2.7a2.8,2.8,0,0,0,.586-1.36C6.525.908,6.74,0,7.206,0,7.76,0,8.869.185,8.869,1.881Z" fill="#714de1" />
                                </svg>
                                <p className="text-sm text-gray-500 cursor-pointer hover:underline hidden sm:block">17K</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11.824" height="11.825" viewBox="0 0 11.824 11.825">
                                    <path id="Icon_awesome-comment-alt" data-name="Icon awesome-comment-alt" d="M10.346,0H1.478A1.479,1.479,0,0,0,0,1.478V8.129A1.479,1.479,0,0,0,1.478,9.607H3.7v1.94a.278.278,0,0,0,.441.224L7.021,9.607h3.326a1.479,1.479,0,0,0,1.478-1.478V1.478A1.479,1.479,0,0,0,10.346,0Z" fill="#714de1" />
                                </svg>
                                <p className="text-sm text-gray-500 cursor-pointer hover:underline hidden sm:block">26</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11.824" height="13.513" viewBox="0 0 11.824 13.513">
                                    <path id="Icon_awesome-share-alt" data-name="Icon awesome-share-alt" d="M9.29,8.446A2.523,2.523,0,0,0,7.712,9l-2.7-1.691a2.548,2.548,0,0,0,0-1.1l2.7-1.691a2.529,2.529,0,1,0-.9-1.432l-2.7,1.691a2.534,2.534,0,1,0,0,3.965l2.7,1.691A2.534,2.534,0,1,0,9.29,8.446Z" fill="#714de1" />
                                </svg>
                                <p className="text-sm text-gray-500 cursor-pointer hover:underline hidden sm:block">15</p>
                            </div>
                        </div>
                        <div>
                            <p data-tip data-for={`disclaimer${title}`} className="text flex justify-end font-sans hover:underline cursor-pointer"> Disclaimer</p>
                            <ReactTooltip className="md:max-w-sm mx-w-md break-words z-50" id={`disclaimer${title}`}
                                place="top" effect="solid" border={false} borderColor="white" clickable={false} >
                                Although the information contained in these
                                videos has been produced and processed from sources believed to be
                                reliable, no warranty, expressed or implied, is made regarding
                                accuracy, adequacy, completeness, legality, reliability or usefulness of
                                the information. Any reliance you place on such information is
                                therefore strictly at your own risk
                            </ReactTooltip>
                        </div>
                        {/* </div> */}
                    </div>
                    <div className="flex justify-evenly py-1 px-2 space-x-1">
                        <div className="flex justify-center hover:bg-gray-100 items-center py-1 px-3 w-full rounded-md ">
                            <p className={`cursor-pointer w-full text-center text-gray-600 hover:text-purple-600`}>Like</p>
                        </div>
                        <div className="flex justify-center hover:bg-gray-100 items-center py-1 px-3 w-full rounded-md">
                            <p className="cursor-pointer w-full text-center text-gray-600 hover:text-purple-600">Comment</p>
                        </div>
                        <div className="flex hover:bg-gray-100 justify-center items-center py-1s px-3 w-full rounded-md">
                            <p className=" cursor-pointer w-full text-center text-gray-600 hover:text-purple-600">Share</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsfeedCard
