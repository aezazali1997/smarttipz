import React from 'react'
import { faFileVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic'

const  ReactTooltip = dynamic(()=> import ('react-tooltip'),{
    ssr:false
})

const Index = ({ openModal, title, tooltip }) => {
    return (
        <div className="relative w-full shadow flex flex-col justify-center
                    rounded-lg bg-white">
            <div className="space-y-3" onClick={openModal}>
                <div className="flex flex-col w-full justify-center items-center cursor-pointer 
                        border-transparent rounded-lg hover:bg-gray-200 p-2 space-y-2">
                    <FontAwesomeIcon icon={faFileVideo} className="text-6xl text" />
                    <div>
                        <p className="text-center text-md">{title}</p>
                    </div>
                </div>
            </div>
            <span className="absolute top-1 right-2">
                <svg data-tip data-for={title} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {
                     <ReactTooltip id={title} place="top" effect="solid" border={false} borderColor="white" clickable={false}>
                    {tooltip}
                </ReactTooltip>
                }
                
            </span>
        </div>
    )
}

export default Index;
