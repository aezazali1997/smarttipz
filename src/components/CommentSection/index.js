import React from 'react'
import { CommentCard, EmojiInput } from 'src/components';

const CommentSection = () => {
    return (
        <div className="flex flex-col w-full space-x-2 px-4">
            <div className="py-1">
                <EmojiInput />
            </div>
            <div className="space-y-2 py-2">
                <CommentCard />
                <CommentCard />
                <CommentCard />
            </div>
        </div>
    )
}

export default CommentSection;
