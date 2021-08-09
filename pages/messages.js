import React from 'react'
import { Helmet } from 'react-helmet';

const Messages = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Messaging | Windswept</title>
            </Helmet>
            <div className="max-w-md w-full space-y-8">
                <div className="py-20 h-screen bg-white px-2">
                    <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                        <div className="md:flex">
                            <div className="w-full p-3">
                                <div className="relative h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                                    <div className="absolute">
                                        <div className="flex flex-col items-center"> <i className="fa fa-folder-open fa-4x text-blue-700"></i> <span className="block text-gray-400 font-normal">Attach you files here</span> </div>
                                    </div> <input type="file" className="h-full w-full opacity-0" name="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages;
