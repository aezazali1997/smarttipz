/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { faFileVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Helmet } from 'react-helmet';
import { MediaUploadForm, NewsfeedCard, NewsFeedFilters, Rating, Searchbar, Switch, VideoPlayer } from 'src/components';
import { PostActionDropdown } from 'src/components/Dropdown';
import { TipModal, VideoRatingModal } from 'src/components/Modals';
import { UseFetchNewsFeed } from 'src/hooks';

const NewsFeed = () => {

  const { formik, _DeleteImg, ChangeAgreement, agree, urls, setUrls, showModal,
    _OpenUploadModal, _CloseUploadModal, thumbnailRef, _OnRemoveThumbnail, onChangeThumbnail,
    _OnThumbnailClick, thumbnailUrl, MediaType, setMediaType, _HandleGotoUserProfile,
    uploadingThumbnail, posts, HandleLikePost, HandleCheckLike, _HandleCatalogue, _HandleDeleteVideo,
    _HandleGotoVideoDetails, ToggleRatingModal, _HandleChangeRating, showRatingModal, ToggleTipModal, _HandleChangeTip, showTipModal
  } = UseFetchNewsFeed();

  return (

    <div className="flex flex-col lg:flex-row min-h-screen w-full justify-around py-5 px-3 bg-gray-50">
      {/*SEO Support*/}
      <Helmet>
        <title>News Feed | Smart Tipz</title>
      </Helmet>

      <div className="flex flex-col w-full">
        {/*SEO Support End */}
        <div className="w-full mb-4">
          <div className="mx-auto max-w-lg shadow flex flex-col justify-center 
                    rounded-lg bg-white divide-y space-y-4">
            <div className="space-y-3" onClick={_OpenUploadModal}>
              <div className="flex flex-col w-full justify-center items-center cursor-pointer 
                        border-transparent rounded-lg hover:bg-gray-200 p-2 space-y-2">
                <FontAwesomeIcon icon={faFileVideo} className="text-6xl text" />
                <div>
                  <p className="text-center text-lg font-semibold">Add Video</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {
            posts && posts.map(({ id, description, title, url, UserId, thumbnail, PostLikees, catalogue, User }, index) => (
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
                  width={'max-w-lg'}
                  thumbnail={thumbnail}
                  ToggleTipModal={ToggleTipModal}
                  ToggleRatingModal={ToggleRatingModal}
                  _HandleDeleteVideo={_HandleDeleteVideo}
                  _HandleCatalogue={_HandleCatalogue}
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
            modalTitle={'Video Rating Modal'}
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
            modalTitle={"Video Tip Modal"}
          />
        )
      }
    </div>
  )
}

export default NewsFeed;