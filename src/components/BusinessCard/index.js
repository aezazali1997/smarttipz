/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Email, LinkSVG, PhoneSVG } from 'src/assets/SVGs';

const BusinessCard = ({ phone, image, name, email, website }) => {
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full mt-5 ">
                <div className="flex flex-col max-w-md sm:max-w-md border rounded-lg py-4 shadow-lg bg-white">
                    <div className="flex w-full items-center justify-between">
                        <div className="flex">
                            <div id="pointer" className="p-2 pt-0 space-y-2">
                                <h1 className="text-lg font-semibold text-white break-all">{name}</h1>
                                <div>
                                    <span className="flex items-center">
                                        <PhoneSVG className="w-4 h-4 text-gray-300" />
                                        &nbsp;
                                        <h1 className="text-sm font-normal break-all text-white">{phone}</h1>
                                    </span>
                                    <span className="flex items-center">
                                        <Email className="w-4 h-4 text-gray-300" />
                                        &nbsp;
                                        <h1 className="text-sm font-normal break-all text-white">{email}</h1>
                                    </span>
                                    <span className="flex">
                                        <LinkSVG className="w-4 h-4 self-start text-gray-300" />
                                        &nbsp;
                                        <h1 className="text-sm font-normal text-white break-all">{website}</h1>
                                    </span>
                                </div>
                            </div>
                            <div id="pointer1"></div>
                        </div>
                        <div className="flex px-2 sm:px-5">
                            {
                                image ?
                                    <img className="inline-block h-16 w-16 sm:h-20 sm:w-20 rounded-full border ring-2 ring-indigo-600"
                                        src={image}
                                        alt="cardPic"
                                    /> :
                                    <img className="inline-block h-10 w-10 sm:h-20 sm:w-20 rounded-full border ring-2 ring-indigo-600"
                                        src="https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg"
                                        alt="cardPic"
                                    />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BusinessCard;
