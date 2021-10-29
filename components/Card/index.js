/* eslint-disable @next/next/no-img-element */
import { Rating, VideoPlayer } from 'components';
import React from 'react'
// import Image from 'next/image';
import ReactTooltip from 'react-tooltip';

const Card = ({ image, like, comment, share, title, views, rating, disclaimer, mediaType, thumbnail }) => {
    return (
        <div className="px-1">
            <div className="max-w-sm overflow-hidden">
                {
                    mediaType ?
                        mediaType === 'image' ?
                            <img className="w-full rounded-lg h-48 object-cover"
                                src={image} alt="Sunset in the mountains" />
                            :
                            <VideoPlayer poster={thumbnail} src={image} />
                        :
                        <img className="w-full rounded-lg"
                            src={image} alt="Sunset in the mountains" layout="fill" />
                }
                <div className="py-2 flex flex-row justify-between space-x-2">
                    <div className="flex w-full text-sm ">
                        <p className=" overflow-ellipsis overflow-hidden"> {title}</p>
                    </div>
                    <div className="flex flex-row w-full items-start space-x-3">
                        {
                            like &&
                            <span className="flex flex-row w-full items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11.825" height="11.825" viewBox="0 0 11.825 11.825">
                                    <path id="Icon_awesome-thumbs-up" data-name="Icon awesome-thumbs-up" d="M2.4,5.173H.554A.554.554,0,0,0,0,5.728v5.543a.554.554,0,0,0,.554.554H2.4a.554.554,0,0,0,.554-.554V5.728A.554.554,0,0,0,2.4,5.173ZM1.478,10.9a.554.554,0,1,1,.554-.554A.554.554,0,0,1,1.478,10.9Zm7.391-9.02c0,.98-.6,1.529-.769,2.184H10.45a1.38,1.38,0,0,1,1.375,1.342,1.672,1.672,0,0,1-.449,1.136l0,0a1.929,1.929,0,0,1-.215,1.835,1.826,1.826,0,0,1-.378,1.727,1.226,1.226,0,0,1-.142,1.031c-.471.677-1.64.687-2.628.687H7.945a6.63,6.63,0,0,1-2.761-.733,3.635,3.635,0,0,0-1.216-.374.277.277,0,0,1-.272-.277V5.5a.277.277,0,0,1,.082-.2C4.692,4.4,5.086,3.446,5.836,2.7a2.8,2.8,0,0,0,.586-1.36C6.525.908,6.74,0,7.206,0,7.76,0,8.869.185,8.869,1.881Z" fill="#714de1" />
                                </svg>&nbsp;<p className="text-xs">{like}</p>
                            </span>
                        }
                        {comment &&
                            <span className="flex flex-row w-full items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11.824" height="11.825" viewBox="0 0 11.824 11.825">
                                    <path id="Icon_awesome-comment-alt" data-name="Icon awesome-comment-alt" d="M10.346,0H1.478A1.479,1.479,0,0,0,0,1.478V8.129A1.479,1.479,0,0,0,1.478,9.607H3.7v1.94a.278.278,0,0,0,.441.224L7.021,9.607h3.326a1.479,1.479,0,0,0,1.478-1.478V1.478A1.479,1.479,0,0,0,10.346,0Z" fill="#714de1" />
                                </svg>
                                &nbsp;<p className="text-xs">{comment}</p>
                            </span>
                        }
                        {
                            share &&
                            <span className="flex flex-row w-full items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11.824" height="13.513" viewBox="0 0 11.824 13.513">
                                    <path id="Icon_awesome-share-alt" data-name="Icon awesome-share-alt" d="M9.29,8.446A2.523,2.523,0,0,0,7.712,9l-2.7-1.691a2.548,2.548,0,0,0,0-1.1l2.7-1.691a2.529,2.529,0,1,0-.9-1.432l-2.7,1.691a2.534,2.534,0,1,0,0,3.965l2.7,1.691A2.534,2.534,0,1,0,9.29,8.446Z" fill="#714de1" />
                                </svg>
                                &nbsp;<p className="text-xs">{share}</p>
                            </span>
                        }
                    </div>

                </div>
                {
                    rating &&
                    <div className="flex justify-between w-full">
                        <span className="flex w-full items-center">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                            &nbsp;<p className="text-xs">{views} Views</p></span>
                        <span className="flex justify-end w-full items-center z-0">
                            <Rating
                                value={rating}
                            />
                            &nbsp; <p className="text-xs"> Rating</p></span>
                    </div>
                }
                {disclaimer &&
                    <span className="flex justify-end pt-1">
                        <div data-tip data-for={`disclaimer${title}`} className="text flex justify-end w-40 font-sans hover:underline cursor-pointer">
                            Disclaimer
                        </div>
                        <ReactTooltip className="max-w-md break-words" id={`disclaimer${title}`} place="top" effect="solid" border={false} borderColor="white" clickable={false} >
                            Although the information contained in these
                            videos has been produced and processed from sources believed to be
                            reliable, no warranty, expressed or implied, is made regarding
                            accuracy, adequacy, completeness, legality, reliability or usefulness of
                            the information. Any reliance you place on such information is
                            therefore strictly at your own risk
                        </ReactTooltip>
                    </span>
                }
            </div>
        </div>
    )
}

export default Card;
