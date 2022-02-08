import React from 'react'

const PostBadge = ({ data }) => {
    return (
        <div className="flex px-2 h-6 rounded-lg background items-center justify-center">
            <p className="text-white font-sm">{data}</p>
        </div>
    )
}

export default PostBadge;
