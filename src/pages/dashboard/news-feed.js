/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { faFileVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Helmet } from 'react-helmet';
import { MediaUploadForm, NewsfeedCard, NewsFeedFilters, Rating, Searchbar, Switch, VideoPlayer, VideoUploadBlock } from 'src/components';
import { PostActionDropdown } from 'src/components/Dropdown';
import { ShareModal, TipModal, VideoRatingModal } from 'src/components/Modals';
import { UseFetchNewsFeed } from 'src/hooks';

const NewsFeed = () => {

  const { formik, _DeleteImg, ChangeAgreement, agree, urls, setUrls, showModal,
    _OpenUploadModal, _CloseUploadModal, thumbnailRef, _OnRemoveThumbnail, onChangeThumbnail,
    _OnThumbnailClick, thumbnailUrl, MediaType, setMediaType, _HandleGotoUserProfile, videoType,
    uploadingThumbnail, posts, HandleLikePost, HandleCheckLike, _HandleCatalogue, _HandleDeleteVideo,
    _HandleGotoVideoDetails, ToggleRatingModal, _HandleChangeRating, showRatingModal, ToggleTipModal,
    _HandleChangeTip, showTipModal, _OpenShareModal, _CloseShareModal, showShareModal, shareData
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
          <div className='md:w-full lg:w-1/2 space-y-2 md:space-x-2 md:space-y-0  flex flex-col md:flex-row'>
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
        <div className="space-y-4">
          {
            posts && posts.map(({ id, description, title, url, UserId, thumbnail, PostLikees, catalogue, isLiked, likeCount, User, videoType, videoCost }, index) => (
              <div key={index}>
                <NewsfeedCard
                  id={id}
                  UserId={UserId}
                  index={index}
                  catalogue={catalogue}
                  isPost={true}
                  url={url}
                  views={200}
                  User={User}
                  rating={2.5}
                  postLikes={PostLikees}
                  description={description}
                  title={title}
                  isLiked={isLiked}
                  likeCount={likeCount}
                  videoCost={videoCost}
                  videoType={videoType}
                  width={'max-w-lg'}
                  thumbnail={thumbnail}
                  HandleLikePost={HandleLikePost}
                  ToggleTipModal={ToggleTipModal}
                  _OpenShareModal={() => _OpenShareModal(id, thumbnail, url)}
                  _HandleCatalogue={_HandleCatalogue}
                  ToggleRatingModal={ToggleRatingModal}
                  _HandleDeleteVideo={_HandleDeleteVideo}
                  _HandleGotoUserProfile={_HandleGotoUserProfile}
                  _HandleGotoVideoDetails={_HandleGotoVideoDetails}
                />

              </div>
            ))
          }
        </div>
      </div>

      {
        showModal && (
          <MediaUploadForm
            title={'Upload Video'}
            heading='Upload Video'
            urls={urls}
            agree={agree}
            formik={formik}
            accept={'video/*'}
            MediaType={MediaType}
            thumbnailUrl={thumbnailUrl}
            thumbnailRef={thumbnailRef}
            setUrls={setUrls}
            _DeleteImg={_DeleteImg}
            setMediaType={setMediaType}
            ChangeAgreement={ChangeAgreement}
            onChangeThumbnail={onChangeThumbnail}
            _OnThumbnailClick={_OnThumbnailClick}
            _CloseUploadModal={_CloseUploadModal}
            _OnRemoveThumbnail={_OnRemoveThumbnail}
            uploadingThumbnail={uploadingThumbnail}

          />
        )
      }
      {
        showRatingModal && (
          <VideoRatingModal
            modalTitle={'Rate Video'}
            ToggleRatingModal={ToggleRatingModal}
            _HandleChangeRating={_HandleChangeRating}
            loading={false}
            videoRating={2}
          />
        )
      }
      {
        showTipModal && (
          <TipModal
            _HandleChangeTip={_HandleChangeTip}
            tip={2}
            ToggleTipModal={ToggleTipModal}
            loading={false}
            modalTitle={"Tip Video"}
          />
        )
      }
      {
        showShareModal && (
          <ShareModal
            modalTitle={'Share Post'}
            _HandleSubmit={_CloseShareModal}
            ToggleShareModal={_CloseShareModal}
            shareData={shareData}

          />
        )
      }
    </div>
  )
}

export default NewsFeed;