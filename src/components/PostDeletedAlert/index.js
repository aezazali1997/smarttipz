import React from 'react'

const PostDeletedAlert = () => {
    return (
        <div
            className={`mx-auto max-w-lg pt-2 pb-4 border flex flex-col justify-center rounded-lg overflow-hidden
                bg-white space-y-2`}>
            <div className="flex w-full px-2 space-x-2">
                <svg className="w-6 h-6 text" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <div className="flex flex-col w-full">
                    <p
                        className="text-sm font-bold font-sans hover:underline cursor-pointer">
                        This content isn&apos;t available at the moment
                    </p>
                    <p className="text-xs text-gray-500">
                        When this happens it&apos;s usually because the owner only shared it with a small group of people or it&apos;s been deleted
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PostDeletedAlert;
