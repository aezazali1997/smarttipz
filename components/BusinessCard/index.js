/* eslint-disable @next/next/no-img-element */
import React from 'react'

const BusinessCard = ({ phone, image, name, email, website }) => {
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-center w-full mt-5">
                <div className="flex flex-col max-w-sm border p-2 shadow-lg bg-white">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col items-start">
                            <h1 className="text-xs font-sans">FullName:</h1>
                            <h1 className="text-xs font-sans text-left font-semibold">{name}</h1>
                        </div>
                        <span className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                            &nbsp;
                            <h1 className="text-xs font-sans text-gray-600">{phone}</h1>
                        </span>
                    </div>
                    <div className="flex w-full justify-center">
                        <div className="h-32 w-32">
                            <img src={image} alt="brand" />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full space-x-2">
                        <div className="flex items-center">
                            <h1 className="text-xs font-sans">Email:</h1>&nbsp;
                            <h1 className="text-xs font-sans font-semibold">{email}</h1>
                        </div>
                        <span className="flex  items-center">
                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                            </svg>&nbsp;
                            <h1 className="text-xs font-sans text-gray-600">{website}</h1>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BusinessCard;
