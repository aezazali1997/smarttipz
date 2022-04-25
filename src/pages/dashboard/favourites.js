/* eslint-disable react/jsx-key */
import { isEmpty } from 'lodash';
import { parseCookies } from 'nookies';
import React from 'react';
import { Helmet } from 'react-helmet';
import { NewsfeedCard, Spinner } from 'src/components';
import { ShareModal } from 'src/components/Modals';
import { UseFetchFavourite } from 'src/hooks';

const Favourites = () => {
  const {
    _HandleSharePost,
    _OpenShareModal,
    HandleLikePost,
    _HandleGotoVideoDetails,
    _HandleDeleteVideo,
    _HandleCatalogue,
    _ChangeFilter,
    _CloseShareModal,
    setShareCaption,
    _HandleCommentCounts,
    filterdVideos,
    filter,
    loading,
    showShareModal,
    isSharing,
    shareData,
    shareCaption,
    postViewOnVideo,
    HandleFavouritePost
  } = UseFetchFavourite();

  return (
    <div className="flex flex-col min-h-screen w-full p-5 space-y-1">
      {/*SEO Support*/}
      <Helmet>
        <title>Favourites | Smart Tipz</title>
      </Helmet>
      {/*SEO Support End */}

      {loading ? (
        <div className="flex w-full justify-center items-center h-screen ">
          <span className="flex flex-col items-center -mt-52">
            <Spinner />
            <p className="text-sm text-gray-400"> Loading Videos</p>
          </span>
        </div>
      ) : isEmpty(filterdVideos) ? (
        <div className="flex w-full justify-center items-center">
          <p className="text-gray-500"> No Videos</p>
        </div>
      ) : (
        <div className="flex flex-col w-full sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filterdVideos.map((item, index) => {
            const {
              id: postId,
              isLiked,
              likeCount,
              commentCount,
              shareCount,
              avgRating,
              isFavourite,
              Video: {
                id,
                title,
                url,
                thumbnail,
                mediaType,
                UserId,
                description,
                User,
                catalogue,
                videoCost,
                videoType,
                Shares,
                productLink,
                createdAt,
                views
              }
            } = item;
            return (
              <div key={index}>
                <NewsfeedCard
                  id={postId}
                  videoId={id}
                  UserId={UserId}
                  index={index}
                  catalogue={catalogue}
                  url={url}
                  User={User}
                  Shares={Shares}
                  views={views}
                  createdAt={createdAt}
                  avgRating={avgRating}
                  isLiked={isLiked}
                  likeCount={likeCount}
                  commentCount={commentCount}
                  shareCount={shareCount}
                  videoCost={videoCost}
                  isFavourite={isFavourite}
                  HandleFavouritePost={HandleFavouritePost}
                  videoType={videoType}
                  mediaType={mediaType}
                  description={description}
                  title={title}
                  isPost={true}
                  width={'max-w-xs'}
                  thumbnail={thumbnail}
                  productLink={productLink}
                  HandleLikePost={() => HandleLikePost(postId, isLiked)}
                  _HandleCommentCounts={_HandleCommentCounts}
                  _OpenShareModal={_OpenShareModal}
                  _HandleCatalogue={_HandleCatalogue}
                  _HandleDeleteVideo={_HandleDeleteVideo}
                  _HandleGotoVideoDetails={_HandleGotoVideoDetails}
                  _handleViewsOnVideo={postViewOnVideo}
                />
              </div>
            );
          })}
        </div>
      )}
      {showShareModal && (
        <ShareModal
          modalTitle={'Share Post'}
          loading={isSharing}
          shareData={shareData}
          shareCaption={shareCaption}
          _HandleSubmit={_HandleSharePost}
          setShareCaption={setShareCaption}
          ToggleShareModal={_CloseShareModal}
        />
      )}
    </div>
  );
};
export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  if (!token)
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login'
      },
      props: {}
    };
  else {
    return { props: {} };
  }
};

export default Favourites;
