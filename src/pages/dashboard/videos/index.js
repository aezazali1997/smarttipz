/* eslint-disable react/jsx-key */
import { isEmpty } from 'lodash';
import React from 'react';
import { Helmet } from 'react-helmet';
import { NewsfeedCard, Spinner } from 'src/components';
import { ShareModal } from 'src/components/Modals';
import { UseFetchVideo } from 'src/hooks';

const Videos = () => {
    const { _HandleSharePost, _OpenShareModal, HandleLikePost, _HandleGotoVideoDetails, _HandleDeleteVideo,
        _HandleCatalogue, _ChangeFilter, _CloseShareModal, setShareCaption, filterdVideos, filter,
        loading, showShareModal, isSharing, shareData, shareCaption,
    } = UseFetchVideo();

    return (
        <div className="flex flex-col min-h-screen w-full p-5 space-y-1">
            {/*SEO Support*/}
            <Helmet>
                <title>Videos | Smart Tipz</title>
            </Helmet>
            {/*SEO Support End */}
            <div className="flex items-center space-x-2">
                <div className="flex h-10 justify-center text-md text-black font-sans"> Categories:</div>
                <div className={`floating-input mb-5 relative z-0`}>
                    <select
                        type='select'
                        id='videos'
                        name='videos'
                        value={filter}
                        className='border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-52 px-2 py-3 h-12 cursor-pointer'
                        onChange={_ChangeFilter}
                        placeholder="name@example.com"
                    >
                        <option value="all">All</option>
                        <option value="Category1">Category 1</option>
                        <option value="Category2">Category 2</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500 pointer-events-none" width="19.524" height="19.524" viewBox="0 0 19.524 19.524">
                            <path id="Icon_ionic-ios-arrow-dropdown-circle" data-name="Icon ionic-ios-arrow-dropdown-circle" d="M3.375,13.137a9.762,9.762,0,0,0,19.524,0c0-3.656-5.248-8.658-5.248-8.658a16.252,16.252,0,0,0-4.514-1.1A9.76,9.76,0,0,0,3.375,13.137ZM16.943,11.1s.929-.352,1.281,0a.9.9,0,0,1,.263.638.91.91,0,0,1-.268.643l-4.426,4.412a.9.9,0,0,1-1.248-.028L8.054,12.287a.906.906,0,0,1,1.281-1.281l3.806,3.844Z" transform="translate(-3.375 -3.375)" fill="#6d6d6d" />
                        </svg>

                    </div>
                </div>
            </div>
            {
                loading ? (
                    <div className="flex w-full justify-center">
                        <span className="flex flex-col items-center">
                            <Spinner />
                            <p className="text-sm text-gray-400"> Loading Videos</p>
                        </span>
                    </div>
                )
                    :
                    isEmpty(filterdVideos) ? (
                        <div className="flex w-full justify-center items-center">
                            <p className="text-gray-500"> No Videos</p>
                        </div>
                    )
                        :
                        <div className="flex flex-col w-full sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-col-4 gap-3">
                            {
                                filterdVideos.map(({ title, url, thumbnail, mediaType, id, UserId, description, User, catalogue, videoCost,
                                    videoType, isLiked, likeCount, Shares }, index) => (
                                    <div key={index}>
                                        <NewsfeedCard
                                            id={id}
                                            UserId={UserId}
                                            index={index}
                                            catalogue={catalogue}
                                            url={url}
                                            User={User}
                                            Shares={Shares}
                                            views={200}
                                            rating={2.5}
                                            isLiked={isLiked}
                                            likeCount={likeCount}
                                            videoCost={videoCost}
                                            videoType={videoType}
                                            mediaType={mediaType}
                                            description={description}
                                            title={title}
                                            isPost={true}
                                            width={'max-w-xs'}
                                            thumbnail={thumbnail}
                                            _OpenShareModal={_OpenShareModal}
                                            HandleLikePost={HandleLikePost}
                                            _HandleGotoVideoDetails={_HandleGotoVideoDetails}
                                            _HandleCatalogue={_HandleCatalogue}
                                            _HandleDeleteVideo={_HandleDeleteVideo}
                                        />
                                    </div>
                                ))
                            }
                        </div>
            }
            {
                showShareModal && (
                    <ShareModal
                        modalTitle={'Share Post'}
                        loading={isSharing}
                        shareData={shareData}
                        shareCaption={shareCaption}
                        _HandleSubmit={_HandleSharePost}
                        setShareCaption={setShareCaption}
                        ToggleShareModal={_CloseShareModal}
                    />
                )
            }
        </div>
    )
}

export default Videos;
