/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from 'react'

const TestimonialCard = ({ image, name, designation, description, data, _Edit, _Delete, otherUser }) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl">
            <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                    {
                        image ?
                            <img className="h-10 w-10 sm:h-20 rounded-full object-cover sm:w-20"
                                src={image}
                                alt="testimonial"
                            />
                            :
                            <img className="h-20 rounded-full object-cover w-20"
                                src='https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg'
                                alt="testimonial"
                            />
                    }
                </div>
                <div className="flex flex-row py-2 px-4 bg-gray-50 rounded-3xl space-x-2">
                    <div className="flex flex-col ">
                        <div className="tracking-wide text-md text-black font-semibold">{name}</div>
                        <p className="block text-xs leading-tight text-gray-600">{designation}</p>
                        <p className="text-sm text-black">{description}</p>
                    </div>
                    {!otherUser && (
                        <div className="flex flex-col items-center justify-center divide-y-2 space-y-2">
                            <p onClick={() => _Edit(data)} className="flex items-center cursor-pointer">
                                <svg className="w-5 h-5 icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                </svg>
                            </p>
                            <p onClick={() => _Delete(data)} className="flex items-center cursor-pointer">
                                <svg className="w-5 h-5 icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard;
