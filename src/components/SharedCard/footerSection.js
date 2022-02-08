import { faCommentAlt, faShareAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const FooterSection = ({
    id,
    videoId,
    index,
    Video,
    isLiked,
    likeCount,
    commentCount,
    HandleLikePost,
    _OpenShareModal,
    _HandleCommentSection
}) => {

    const { User: { picture = '', name = '' }, title = '', thumbnail = '', url = '' } = Video;

    return (
        <div className="flex justify-evenly py-1 px-2 space-x-2 divide-x border-t border-b">
            <div
                onClick={HandleLikePost}
                className="flex relative justify-center group items-center py-1 px-3 w-full  cursor-pointer">
                <div className="flex flex-col items-center">
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        className={`w-6 h-6 ${isLiked === false ? 'text-gray-600'
                            : 'text-purple-600'} group-hover:text-purple-600`}
                    />
                    <p
                        className={`cursor-pointer w-full text-xs text-center 
                                    ${isLiked === false
                                ? 'text-gray-600'
                                : 'text-purple-600'
                            } group-hover:text-purple-600`}>
                        {likeCount}
                    </p>
                </div>
            </div>
            <div
                onClick={() => _HandleCommentSection()}
                className="flex space-x-2 justify-center relative group py-1 px-3 w-full  cursor-pointer">
                <div className="flex flex-col items-center">
                    <FontAwesomeIcon
                        icon={faCommentAlt}
                        className="w-6 h-6 text-gray-600 group-hover:text-purple-600"
                    />
                    <p className="cursor-pointer w-full text-xs text-center text-gray-600 group-hover:text-purple-600">
                        {commentCount || 0}
                    </p>
                </div>
            </div>
            <div
                onClick={() => _OpenShareModal(videoId, thumbnail, url, picture, name, title)}
                className="flex relative group justify-center items-center py-1 px-3 w-full cursor-pointer">
                <div className="flex flex-col items-center">
                    <FontAwesomeIcon
                        icon={faShareAlt}
                        className="w-6 h-6 text-gray-600 group-hover:text-purple-600"
                    />
                </div>
            </div>
        </div>
    );
};

export default FooterSection;
