/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from 'react'

const TestimonialCard = ({ image, name, designation, description }) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl cursor-pointer">
            <div className="flex items-center space-x-3">
                <div className="md:flex-shrink-0">
                    {
                        image ?
                            <img className="h-20 rounded-full object-cover md:w-20"
                                src={image}
                                alt="testimonial"
                            />
                            :
                            <img className="h-20 rounded-full object-cover md:w-20"
                                src='https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg'
                                alt="testimonial"
                            />
                    }
                </div>
                <div className="py-2 px-4 bg-gray-50 rounded-3xl">
                    <div className=" tracking-wide text-md text-black font-semibold">{name}</div>
                    <p className="block text-xs leading-tight text-gray-600">{designation}</p>
                    <p className="text-sm text-black">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard;
