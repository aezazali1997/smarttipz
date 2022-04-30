import axios from 'axios';
import { parseCookies } from 'nookies';
import React from 'react';
import { Spinner, NewsfeedCard } from 'src/components';
import { UseFetchPost } from 'src/hooks';
const Index = () => {
  const {
    id,
    videoPost,
    loading,
    user,
    isFavourite,
    allPost,
    isLiked,
    _HandleCommentCounts,
    HandleLikePost,
    _OpenShareModal,
    _HandleCatalogue,
    _HandleDeleteVideo,
    HandleFavouritePost,
    _HandleGotoUserProfile
  } = UseFetchPost();

  return (
    <div className="video-card">
      {loading && videoPost ? (
        <div className="flex h-screen justify-center items-center">
          <Spinner />
          <span className="ml-1"> Loading Post...</span>
        </div>
      ) : (
        <NewsfeedCard
          id={id}
          videoId={videoPost.id}
          UserId={videoPost.UserId}
          catalogue={videoPost.catalogue}
          isPost={true}
          url={videoPost.url}
          views={videoPost.views}
          User={user}
          description={videoPost.description}
          title={videoPost.title}
          Shares={null}
          videoCost={videoPost.videoCost}
          videoType={videoPost.videoType}
          watchLimit={videoPost.watchLimit}
          productLink={videoPost.productLink}
          isLiked={isLiked}
          isFavourite={isFavourite}
          likeCount={allPost?.likeCount || 0}
          shareCount={videoPost.shareCount}
          commentCount={allPost?.commentCount || 0}
          avgRating={videoPost.rating}
          thumbnail={videoPost.thumbnail}
          createdAt={videoPost.createdAt}
          restrictPaidVideo={false}
          _HandleCommentCounts={_HandleCommentCounts}
          HandleLikePost={() => HandleLikePost(id, isLiked)}
          //   TogglePaymentModal={() => _TogglePaymentModal(cost, id, UserId)}
          //   ToggleTipModal={() => ToggleTipModal(User?.tip, id, UserId)}
          _OpenShareModal={_OpenShareModal}
          _HandleCatalogue={_HandleCatalogue}
          _HandleDeleteVideo={_HandleDeleteVideo}
          HandleFavouritePost={HandleFavouritePost}
          _HandleGotoUserProfile={_HandleGotoUserProfile}
          //   ToggleRatingModal={() => OpenRatingModal({ postId, avgRating, totalRaters, isSubmitingRating })}
          //   _HandleGotoVideoDetails={_HandleGotoVideoDetails}
          //   _handleViewsOnVideo={postViewOnVideo}

          width={'custom-video-page'}
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
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/profile`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    const { data } = res.data;
    return {
      props: {
        profile: data
      }
    };
  }
};

export default Index;
