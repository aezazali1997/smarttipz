import React from 'react'

const CaptionSection = ({ Share }) => {
    return (
        <div className="flex w-full">
            <p className="px-5 text-sm max-w-md">
                {Share?.caption}
            </p>
        </div>
    )
}

export default CaptionSection
