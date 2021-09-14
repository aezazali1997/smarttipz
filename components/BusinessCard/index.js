/* eslint-disable @next/next/no-img-element */
import React from 'react'

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
                                        <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                                        &nbsp;
                                        <h1 className="text-sm font-normal break-all text-white">{phone}</h1>
                                    </span>
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                        &nbsp;
                                        <h1 className="text-sm font-normal break-all text-white">{email}</h1>
                                    </span>
                                    <span className="flex">
                                        <svg className="w-4 h-4 self-start text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" /></svg>
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
                                        alt=""
                                    /> :
                                    <img className="inline-block h-10 w-10 sm:h-20 sm:w-20 rounded-full border ring-2 ring-indigo-600"
                                        src="https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg"
                                        alt=""
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
