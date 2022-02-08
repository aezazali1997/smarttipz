import React from 'react'

const Index = ({ width }) => {
    return (
        <div className="relative pt-1 w-full">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                <div style={{ width: `${width}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
            </div>
        </div>
    )
}

export default Index
