/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Helmet } from 'react-helmet';
import { isEmpty } from 'lodash';
import { MediaUploadForm, NewsfeedCard, VideoUploadBlock, Spinner, SharedCard, CustomLoader } from 'src/components';
import { PaymentModal, ShareModal, TipModal, VideoRatingModal, StripeCheckoutModal } from 'src/components/Modals';
import { UseFetchNewsFeed } from 'src/hooks';
import { AnimatePresence } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';

const NewsFeed = () => {
  const {
    formik,
    _DeleteImg,
    ChangeAgreement,
    agree,
    urls,
    setUrls,
    showModal,
    _OpenUploadModal,
    _CloseUploadModal,
    thumbnailRef,
    _OnRemoveThumbnail,
    onChangeThumbnail,
    _OnThumbnailClick,
    thumbnailUrl,
    MediaType,
    setMediaType,
    _HandleGotoUserProfile,
    videoType,
    uploadingThumbnail,
    posts,
    HandleLikePost,
    _HandleCatalogue,
    _HandleDeleteVideo,
    _HandleGotoVideoDetails,
    ToggleRatingModal,
    _HandleChangeRating,
    showRatingModal,
    ToggleTipModal,
    _HandleChangeTip,
    showTipModal,
    _OpenShareModal,
    _CloseShareModal,
    showShareModal,
    shareData,
    _HandleSharePost,
    shareCaption,
    setShareCaption,
    isSharing,
    HandleFavouritePost,
    _HandleChangePostOnNewsfeed,
    postOnFeed,
    tip,
    isloadingFeed,
    OpenRatingModal,
    postRating,
    _SubmitRating,
    showAmountModal,
    _TogglePaymentModal,
    videoPayment,
    _HandleCommentCounts,
    _FetchMoreData,
    hasMore,
    isSubmitingRating,
    postViewOnVideo,
    paymentSubmit,
    handleTipSubmit,
    showCelebration,
    isPaying,
    paymentError,
    tipError
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
          <InfiniteScroll
            dataLength={posts.length} //This is important field to render the next data
            next={_FetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center items-center w-full">
                <CustomLoader />
              </div>
            }
            endMessage={
              <p style={{ textAlign: 'center', padding: '2px 0' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }>
            <div className="space-y-4">
              {posts.map((item, index) => {
                const {
                  id: postId,
                  Video,
                  isShared,
                  Share,
                  likeCount,
                  shareCount,
                  commentCount,
                  avgRating,
                  totalRaters,
                  isLiked,
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
                    watchLimit,
                    cost,
                    createdAt,
                    views
                  },
                  hasPaid
                } = item;
                return isShared ? (
                  <SharedCard
                    key={index}
                    id={postId}
                    videoId={id}
                    index={index}
                    Video={Video}
                    Share={Share}
                    posts={posts}
                    isLiked={isLiked}
                    width={'max-w-lg'}
                    likeCount={likeCount}
                    shareCount={shareCount}
                    commentCount={commentCount}
                    restrictPaidVideo={true}
                    createdAt={createdAt}
                    ToggleTipModal={ToggleTipModal}
                    _OpenShareModal={_OpenShareModal}
                    _HandleCommentCounts={_HandleCommentCounts}
                    HandleLikePost={() => HandleLikePost(postId, isLiked)}
                    _handleViewsOnVideo={postViewOnVideo}
                    _HandleGotoUserProfile={_HandleGotoUserProfile}
                    _HandleGotoVideoDetails={_HandleGotoVideoDetails}
                    TogglePaymentModal={() => _TogglePaymentModal(cost)}
                  />
                ) : (
                  isApproved && isShowOnNewsfeed && (
                    <NewsfeedCard
                      key={index}
                      id={postId}
                      videoId={id}
                      UserId={UserId}
                      index={index}
                      catalogue={catalogue}
                      isPost={true}
                      url={url}
                      views={views}
                      User={User}
                      description={description}
                      title={title}
                      Shares={Shares}
                      videoCost={videoCost}
                      videoType={videoType}
                      watchLimit={watchLimit}
                      productLink={productLink}
                      isLiked={isLiked}
                      posts={posts}
                      width={'max-w-lg'}
                      likeCount={likeCount}
                      shareCount={shareCount}
                      commentCount={commentCount}
                      avgRating={avgRating}
                      thumbnail={thumbnail}
                      createdAt={createdAt}
                      restrictPaidVideo={!hasPaid}
                      _HandleCommentCounts={_HandleCommentCounts}
                      HandleLikePost={() => HandleLikePost(postId, isLiked)}
                      TogglePaymentModal={() => _TogglePaymentModal(cost, id, UserId)}
                      ToggleTipModal={() => ToggleTipModal(User?.tip, id, UserId)}
                      _OpenShareModal={_OpenShareModal}
                      _HandleCatalogue={_HandleCatalogue}
                      _HandleDeleteVideo={_HandleDeleteVideo}
                      HandleFavouritePost={HandleFavouritePost}
                      _HandleGotoUserProfile={_HandleGotoUserProfile}
                      ToggleRatingModal={() => OpenRatingModal({ postId, avgRating, totalRaters, isSubmitingRating })}
                      _HandleGotoVideoDetails={_HandleGotoVideoDetails}
                      _handleViewsOnVideo={postViewOnVideo}
                    />
                  )
                );
              })}
            </div>
          </InfiniteScroll>
        )}
      </div>
      <AnimatePresence>
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
            checkPostOnFeed={postOnFeed}
            ChangeAgreement={ChangeAgreement}
            onChangeThumbnail={onChangeThumbnail}
            _OnThumbnailClick={_OnThumbnailClick}
            _CloseUploadModal={_CloseUploadModal}
            _OnRemoveThumbnail={_OnRemoveThumbnail}
            uploadingThumbnail={uploadingThumbnail}
            setShareCaption={setShareCaption}
            shareCaption={shareCaption}
            _HandleChangePostOnNewsfeed={_HandleChangePostOnNewsfeed}
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
            _isSubmiting={isSubmitingRating}
          />
        )}
        {showTipModal && (
          <TipModal
            _HandleChangeTip={_HandleChangeTip}
            tip={tip}
            ToggleTipModal={ToggleTipModal}
            loading={isPaying}
            modalTitle={'Tip Video'}
            handleTipSubmit={handleTipSubmit}
            showCelebration={showCelebration}
            tipError={tipError}
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

        {showAmountModal && (
          <PaymentModal
            ToggleAmountModal={_TogglePaymentModal}
            loading={isPaying}
            amount={videoPayment}
            paymentSubmit={paymentSubmit}
            paymentError={paymentError}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsFeed;
