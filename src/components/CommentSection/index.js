import React from 'react';
import { CommentCard, EmojiInput } from 'src/components';

const CommentSection = ({
    message,
    setMessage,
    comments,
    loading,
    _HandleSubmitComment,
    _HandleDeleteComments,
    _HandleGotoUserProfile,
}) => {
    return (
        <div className="flex flex-col w-full space-x-2 px-4">
            <div className="py-1">
                <EmojiInput
                    message={message}
                    setMessage={setMessage}
                    handleOnEnter={_HandleSubmitComment}
                />
            </div>
            <div className="space-y-2 py-2">
                <CommentCard
                    data={comments}
                    loading={loading}
                    _HandleDeleteComments={_HandleDeleteComments}
                    _HandleGotoUserProfile={_HandleGotoUserProfile}
                />
            </div>
        </div>
    );
};

export default CommentSection;
