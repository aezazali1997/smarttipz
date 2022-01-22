/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Helmet } from 'react-helmet';
import { isEmpty } from 'lodash';
import { MediaUploadForm, NewsfeedCard, VideoUploadBlock, Spinner, SharedCard } from 'src/components';
import { ShareModal, TipModal, VideoRatingModal } from 'src/components/Modals';
import { UseFetchNewsFeed } from 'src/hooks';


const NewsFeed = () => {

  const { formik, _DeleteImg, ChangeAgreement, agree, urls, setUrls, showModal,
    _OpenUploadModal, _CloseUploadModal, thumbnailRef, _OnRemoveThumbnail, onChangeThumbnail,
    _OnThumbnailClick, thumbnailUrl, MediaType, setMediaType, _HandleGotoUserProfile, videoType,
    uploadingThumbnail, posts, HandleLikePost, _HandleCatalogue, _HandleDeleteVideo,
    _HandleGotoVideoDetails, ToggleRatingModal, _HandleChangeRating, showRatingModal, ToggleTipModal,
    _HandleChangeTip, showTipModal, _OpenShareModal, _CloseShareModal, showShareModal, shareData,
    _HandleSharePost, shareCaption, setShareCaption, isSharing, HandleFavouritePost,
    _HandleChangePostOnNewsfeed, postOnFeed, tip, isloadingFeed, OpenRatingModal, postRating,
    _SubmitRating
  } = UseFetchNewsFeed();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full justify-around py-5 px-3 bg-gray-50">
      {/*SEO Support*/}
      <Helmet>
        <title>News Feed | Smart Tipz</title>
      </Helmet>

      <div className="flex flex-col w-full">
        {/*SEO Support End */}
        <div className="flex w-full justify-center mb-4">
          <div className="md:w-full lg:w-1/2 space-y-2 md:space-x-2 md:space-y-0  flex flex-col md:flex-row">
            <VideoUploadBlock
              openModal={() => _OpenUploadModal('SmartTipz')}
              title={'Click to upload SmartTipz Videos'}
              tooltip={'SmartTIpz can be any video'}
            />
            <VideoUploadBlock
              openModal={() => _OpenUploadModal('SmartReview')}
              title={'Click to upload SmartReviews Videos'}
              tooltip={'SmartReview is a product or service review video'}
            />
          </div>
        </div>
        {isloadingFeed ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : isEmpty(posts) ? (
          <div className="flex w-full justify-center items-center">
            <p className="text-gray-500"> No Feed Yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map(
              (
                {
                  id: postId,
                  Video,
                  isShared,
                  Share,
                  isLiked,
                  shareCount,
                  PostLikees,
                  Video: {
                    id,
                    description,
                    title,
                    url,
                    UserId,
                    thumbnail,
                    catalogue,
                    User,
                    videoType,
                    videoCost,
                    isShowOnNewsfeed,
                    Shares,
                    isApproved,
                    productLink,
                    watchLimit
                  }
                },
                index
              ) =>
                isShared ? (
                  <div key={index}>
                    <SharedCard
                      id={postId}
                      videoId={id}
                      index={index}
                      Video={Video}
                      Share={Share}
                      isLiked={isLiked}
                      width={'max-w-lg'}
                      likeCount={PostLikees}
                      shareCount={shareCount}
                      restrictPaidVideo={true}
                      ToggleTipModal={ToggleTipModal}
                      HandleLikePost={HandleLikePost}
                      _OpenShareModal={_OpenShareModal}
                      _HandleGotoUserProfile={_HandleGotoUserProfile}
                      _HandleGotoVideoDetails={_HandleGotoVideoDetails}
                    />
                  </div>
                ) : (
                  isApproved &&
                  isShowOnNewsfeed && (
                    <div key={index}>
                      <NewsfeedCard
                        id={postId}
                        videoId={id}
                        UserId={UserId}
                        index={index}
                        catalogue={catalogue}
                        isPost={true}
                        url={url}
                        views={200}
                        User={User}
                        rating={2.5}
                        description={description}
                        title={title}
                        Shares={Shares}
                        isLiked={isLiked}
                        likeCount={PostLikees}
                        shareCount={shareCount}
                        videoCost={videoCost}
                        videoType={videoType}
                        watchLimit={watchLimit}
                        productLink={productLink}
                        width={'max-w-lg'}
                        thumbnail={thumbnail}
                        restrictPaidVideo={true}
                        HandleLikePost={HandleLikePost}
                        ToggleTipModal={ToggleTipModal}
                        _OpenShareModal={_OpenShareModal}
                        _HandleCatalogue={_HandleCatalogue}
                        _HandleDeleteVideo={_HandleDeleteVideo}
                        HandleFavouritePost={HandleFavouritePost}
                        _HandleGotoUserProfile={_HandleGotoUserProfile}
                        ToggleRatingModal={() => OpenRatingModal(postId)}
                        _HandleGotoVideoDetails={_HandleGotoVideoDetails}
                      />
                    </div>
                  )
                )
            )}
          </div>
        )}
      </div>
      {showModal && (
        <MediaUploadForm
          title={'Upload Video'}
          heading="Upload Video"
          urls={urls}
          agree={agree}
          formik={formik}
          accept={'video/*'}
          videoType={videoType}
          MediaType={MediaType}
          thumbnailUrl={thumbnailUrl}
          thumbnailRef={thumbnailRef}
          setUrls={setUrls}
          _DeleteImg={_DeleteImg}
          setMediaType={setMediaType}
          _HandleChangePostOnNewsfeed={_HandleChangePostOnNewsfeed}
          checkPostOnFeed={postOnFeed}
          ChangeAgreement={ChangeAgreement}
          onChangeThumbnail={onChangeThumbnail}
          _OnThumbnailClick={_OnThumbnailClick}
          _CloseUploadModal={_CloseUploadModal}
          _OnRemoveThumbnail={_OnRemoveThumbnail}
          uploadingThumbnail={uploadingThumbnail}
          setShareCaption={setShareCaption}
          shareCaption={shareCaption}
        />
      )}
      {showRatingModal && (
        <VideoRatingModal
          loading={false}
          videoRating={postRating}
          modalTitle={'Rate Video'}
          _SubmitRating={_SubmitRating}
          ToggleRatingModal={ToggleRatingModal}
          _HandleChangeRating={_HandleChangeRating}
        />
      )}
      {showTipModal && (
        <TipModal
          _HandleChangeTip={_HandleChangeTip}
          tip={tip}
          ToggleTipModal={ToggleTipModal}
          loading={false}
          modalTitle={'Tip Video'}
        />

      )}
      {showShareModal && (
        <ShareModal
          modalTitle={'Share Post'}
          ToggleShareModal={_CloseShareModal}
          setShareCaption={setShareCaption}
          shareCaption={shareCaption}
          _HandleSubmit={_HandleSharePost}
          loading={isSharing}
          shareData={shareData}
        />
      )}
    </div>
  );
}

export default NewsFeed;