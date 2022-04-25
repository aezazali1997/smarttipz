import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import axiosInstance from 'src/APIs/axiosInstance';
import { useSearchContext } from 'src/contexts';
import { calculateAvgRating, calculateSinglePostAvgRating, checkCountById, checkLikeCount } from 'helpers';

const initialRatingData = {
  postId: '',
  oldAvgRating: '',
  newRating: '',
  totalRaters: ''
};

const UseSearch = () => {
  const { filterSearch } = useSearchContext();
  const router = useRouter();
  const { asPath } = router;

  const [posts, setPosts] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);
  const [catalogueCount, setCatalogueCount] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeGenericFilter, setActiveGenericFilter] = useState('All');
  const [userProfileLoading, setUserProfileLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [sort, setSort] = useState('DESC');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [tip, setTip] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCaption, setShareCaption] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [shareData, setShareData] = useState({});
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [videoPayment, setVideoPayment] = useState(0);
  const [ratingData, setRatingData] = useState({ ...initialRatingData });
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [tipError, setTipError] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const [rateFilter, setRateFilter] = useState(0);
  const [account, setAccountType] = useState({
    Personal: false,
    Business: false
  });
  const [videoCategory, setVideoCategory] = useState({
    Paid: false,
    Free: false
  });
  const [videoType, setVideoType] = useState({
    SmartReview: false,
    SmartTipz: false
  });

  const [userBalance, setUserBalance] = useState(0);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [amountReciever, setAmountReciever] = useState(null);
  const [paymentVideoId, setPaymentVideoId] = useState(null);

  const getBalance = async () => {
    try {
      let {
        data: { balance }
      } = await axiosInstance.getUserBalance(localStorage.getItem('id'));
      setUserBalance(balance);
    } catch (error) {
      console.log('Error while getting user balance');
    }
  };
  const handleTipSubmit = async () => {
    console.log('testing');
    if (localStorage.getItem('id') == amountReciever) {
      return;
    }
    if (tip > userBalance) {
      console.log('hellllllo');
      setTipError('You do not have the required amount in your wallet. Please top up your wallet from Settings.');
      return;
    }

    setIsPaying(true);
    setShowCelebration(true);
    try {
      let data = {
        sender: localStorage.getItem('id'),
        reciever: amountReciever,
        video: paymentVideoId,
        tip
      };

      let {
        data: { balance }
      } = await axiosInstance.postTip(data);
      setUserBalance(balance);

      setTip(0);
      setPaymentVideoId(null);
      setAmountReciever(null);
    } catch (error) {
      console.log('ERROR', error.message);
      Swal.fire({
        icon: 'error',
        text: error.message,
        showCancelButton: false,
        showConfirmButton: false
      });
    }
    setIsPaying(false);
    setShowCelebration(false);
    ToggleTipModal();
  };
  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 991 && showFilterModal) {
        setShowFilterModal(false);
      }
    };

    window.addEventListener('resize', hideMenu);

    return () => {
      window.removeEventListener('resize', hideMenu);
    };
  });
  useEffect(() => {
    if (activeGenericFilter === 'Profile') {
      GetUserProfiles();
    } else {
      GetPosts(currentPage);
    }
  }, [activeGenericFilter]);
  useEffect(() => {
    if (activeGenericFilter === 'All') {
      GetUserProfiles();
    }
  }, [posts]);

  useEffect(() => {
    getBalance();
  }, []);

  //LOADERS START HERE//
  const postViewOnVideo = async (VideoId) => {
    try {
      await axiosInstance.viewPost({ VideoId: VideoId });
    } catch (error) {
      console.log('ERROR:', error);
    }
  };
  const enableProfileLoading = () => {
    setUserProfileLoading(true);
  };

  const disableProfileLoading = () => {
    setUserProfileLoading(false);
  };
  const enablePostsLoading = () => {
    setPostsLoading(true);
  };

  const disablePostsLoading = () => {
    setPostsLoading(false);
  };
  const enableShareLoading = () => {
    setIsSharing(true);
  };

  const disableShareLoading = () => {
    setIsSharing(false);
  };

  //LOADERS END HERE//
  // let getOnePosts = async () => {
  //   enablePostsLoading();
  //   try {
  //     const {
  //       data: {
  //         data: { videos }
  //       }
  //     } = await axiosInstance.getFilteredPost(filterSearch);
  //     setPosts(videos);
  //     var count = 0;
  //     for (let i = 0; i < videos.length; i++) {
  //       if (
  //         videos[i].Video.catalogue === true &&
  //         videos[i].Video.isApproved === true &&
  //         videos[i].isShared === false &&
  //         videos[i].Video.UserId == parseInt(localStorage.getItem('id'))
  //       ) {
  //         count = count + 1;
  //       }
  //     }
  //     setCatalogueCount(count);
  //     disablePostsLoading();
  //   } catch ({
  //     response: {
  //       data: { message }
  //     }
  //   }) {
  //     console.log(message);
  //     disablePostsLoading();
  //   }
  // };
  const paymentSubmit = async () => {
    if (videoPayment > userBalance) {
      setPaymentError('You do not have the required amount in your wallet. Please top up your wallet from Settings.');
      return;
    }
    setIsPaying(true);

    try {
      const data = {
        senderId: localStorage.getItem('id'),
        receiverId: amountReciever,
        paid: videoPayment,
        videoId: paymentVideoId
      };
      let {
        data: { balance }
      } = await axiosInstance.postPaid(data);
      setUserBalance(balance);
      setIsPaying(false);
      setAmountReciever(null);
      _TogglePaymentModal();
      if (activeGenericFilter === 'Posts') {
        console.log('posts');
        let tempPosts = [...posts];
        console.log('tmp posts', tempPosts);
        for (let i = 0; i < posts.length; i++) {
          console.log('i', i);
          if (tempPosts[i].VideoId === paymentVideoId) {
            console.log('paymentid', paymentVideoId, 'post video id', tempPosts[i].VideoId);
            tempPosts[i].hasPaid = true;
            console.log('has paid', tempPosts[i].hasPaid);
          }
        }
        setPosts(tempPosts);
      } else {
        let tempPosts = { ...posts };
        tempPosts.hasPaid = true;

        setPosts(tempPosts);
      }

      Swal.fire({
        text: 'You can now View the Video',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        showCancelButton: false
      });
    } catch (error) {
      console.log('Error! ', error.message);
      _TogglePaymentModal();
      Swal.fire({
        text: error.message,
        icon: 'error',

        showConfirmButton: false,
        showCancelButton: false
      });
    }
  };

  let GetPosts = async (currentPageCount) => {
    enablePostsLoading();
    setPosts('');

    if (activeGenericFilter === 'All') {
      try {
        const {
          data: {
            data: { videos }
          }
        } = await axiosInstance.getFilteredPost(
          filterSearch,
          sort,
          category,
          videoCategory,
          videoType,
          account,
          rateFilter
        );
        setPosts(videos);
        // var count = 0;
        // for (let i = 0; i < videos.length; i++) {
        //     if (videos[i].Video.catalogue === true &&
        //         ideos[i].Video.isApproved === true &&
        //         vidaezazeos[i].isShared === false &&
        //         videos[i].Video.UserId == parseInt(localStorage.getItem('id'))) {
        //         count = count + 1;
        //     }
        // }
        // setCatalogueCount(count);
        disablePostsLoading();
      } catch (error) {
        console.log(error.message);
        disablePostsLoading();
        setPosts([]);
      }
    } else if (activeGenericFilter === 'Posts') {
      try {
        const {
          data: {
            data: { videos, totalVideos }
          }
        } = await axiosInstance.getFilteredPosts(
          filterSearch,
          sort,
          category,
          videoCategory,
          videoType,
          account,
          rateFilter,
          currentPageCount
        );
        setPosts(videos);
        setCurrentPage((prev) => (prev = currentPage));
        videos.length >= totalVideos ? setHasMore(false) : setHasMore(true);
        // var count = 0;
        // for (let i = 0; i < data.videos.length; i++) {
        //     if (videos[i].Video.catalogue === true &&
        //         videos[i].Video.isApproved === true &&
        //         videos[i].isShared === false &&
        //         videos[i].Video.UserId == parseInt(localStorage.getItem('id'))) {
        //         count = count + 1;
        //     }
        // }
        // setCatalogueCount(count);
        disablePostsLoading();
      } catch ({
        response: {
          data: { message }
        }
      }) {
        console.log(message);
        disablePostsLoading();
      }
    }
  };

  const _FetchMoreData = async () => {
    try {
      const {
        data: {
          data: { videos: moreVideos, totalVideos }
        }
      } = await axiosInstance.getFilteredPosts(
        filterSearch,
        sort,
        category,
        videoCategory,
        videoType,
        account,
        rateFilter,
        currentPage + 1
      );
      localStorage.setItem('currentPageCount', currentPage + 1);
      setCurrentPage(currentPage + 1);
      const updatedPostArray = [...posts, ...moreVideos];
      updatedPostArray.length >= totalVideos ? setHasMore(false) : setHasMore(true);
      setPosts([...updatedPostArray]);
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log(message);
    }
  };

  let GetUserProfiles = async () => {
    enableProfileLoading();
    try {
      const {
        data: {
          data: { users }
        }
      } = await axiosInstance.getFilteredUserProfiles(filterSearch, sort, account, rateFilter);
      const deepCopyUsers = [...users];
      const filtered = deepCopyUsers.filter((user) => user?.id !== parseInt(localStorage.getItem('id')) && user);
      setUserProfiles(filtered);
      disableProfileLoading();
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log(message);
      disableProfileLoading();
    }
  };

  const _CheckUrl = () => {
    if (!asPath.includes('?')) {
      router.push('/search?active=All');
    } else {
      const result = asPath.split('?')[1];
      const newResult = result.split('=');
      const key = newResult[0];
      const value = newResult[1];
      setActiveGenericFilter(value);
    }
  };

  useEffect(() => {
    _CheckUrl();
    GetPosts(currentPage);
    GetUserProfiles();
  }, [filterSearch, sort, category, videoCategory, videoType, account, rateFilter]);

  const HandleFavouritePost = async (id) => {
    console.log('handle fav');
    try {
      const {
        data: {
          data: { isFavourite },
          message
        }
      } = await axiosInstance.favouritePost({ videoId: id });

      // sets the icon color changing effect
      let tmpposts = posts;
      if (Array.isArray(tmpposts)) {
        for (let i = 0; i < tmpposts.length; i++) {
          if (tmpposts[i].VideoId === id) {
            tmpposts[i].isFavourite = !tmpposts[i].isFavourite;
          }
        }
        setPosts([...tmpposts]);
      } else {
        tmpposts.isFavourite = !tmpposts.isFavourite;
        setPosts({ ...tmpposts });
      }

      Swal.fire({
        icon: 'success',
        title: `${isFavourite ? 'Added to' : 'Removed from'} favourite`,
        text: `Video ${isFavourite ? 'Added to' : 'Removed from'} favourite section`,
        showCancelButton: false,
        showDenyButton: false,
        showConfirmButton: false,
        timer: 3000
      });
    } catch (error) {
      console.log('fav Post Api failed: ', error.message);
    }
  };

  const _HandleCatalogue = async (videoId, catalogue) => {
    if (catalogueCount < 5 || catalogue === true) {
      try {
        const data = await axiosInstance.addToCatalogue({ videoId, catalogue });
        if (catalogue) {
          setCatalogueCount((catalogueCount) => catalogueCount - 1);
        } else {
          setCatalogueCount((catalogueCount) => catalogueCount + 1);
        }
        const originalArray = [...posts];
        let newArray = originalArray.map((item, i) => {
          if (item.id !== videoId) return item;
          item.Video.catalogue = !catalogue;
          return item;
        });
        setPosts(newArray);
      } catch ({
        response: {
          data: { message }
        }
      }) {
        console.log('error in Api: ', message);
      }
    } else {
      Swal.fire({
        text: 'You can add only 5 videos in catalogue, please delete any to proceed',
        icon: 'info',
        showConfirmButton: true,
        showCancelButton: false,
        buttonsStyling: false,
        customClass: {
          confirmButton:
            'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
        }
      });
    }
  };

  const _HandleDeleteVideo = async (index, videoId) => {
    try {
      // delet the video in search

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        buttonsStyling: false,
        customClass: {
          confirmButton:
            'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
          cancelButton:
            'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosInstance.deleteVideo(videoId);
          console.log('res in use search', res);
          setCatalogueCount((catalogueCount) => catalogueCount - 1);
          const originalArray = [...posts];
          let newArray = originalArray.map((item, i) => {
            if (item.Video.id !== videoId) return item;
            item.Video.isApproved = false;
            return item;
          });
          setPosts(newArray);
        }
      });
    } catch (error) {
      console.log('Api Failed: ', error.message);
    }
  };

  const _HandleGotoUserProfile = (id, username) => {
    if (id !== parseInt(localStorage.getItem('id'))) {
      router.push(`/dashboard/profile/${username}`);
    } else {
      router.push(`/dashboard/profile`);
    }
  };

  const _HandleGotoVideoDetails = (id) => {
    router.push(`/dashboard/videos/${id}`);
  };

  let _TogglePaymentModal = (cost, UserId = 0, id = 0) => {
    setVideoPayment(cost);
    setPaymentVideoId(id);
    setAmountReciever(UserId);
    setShowAmountModal(!showAmountModal);
    setPaymentError('');
  };

  const OpenRatingModal = ({ postId, avgRating, totalRaters }) => {
    const data = {
      postId: postId,
      oldAvgRating: avgRating,
      totalRaters: totalRaters,
      newRating: ''
    };
    setRatingData(data);
    setShowRatingModal(true);
  };

  const ToggleRatingModal = () => {
    setRatingData({ ...initialRatingData });
    setRating(0);
    setShowRatingModal(false);
  };

  const _HandleChangeRating = (value) => {
    setRating(value);
    const copyRatingData = { ...ratingData };
    copyRatingData.newRating = value;
    setRatingData(copyRatingData);
  };

  const _SubmitRating = async () => {
    let rated = false;
    let nAvg = 0;
    const { oldAvgRating = 0, totalRaters = 0, newRating = 0, postId = 1 } = ratingData;

    try {
      let res = await axiosInstance.ratePost({ postId: postId, rating: newRating });
      const { data } = res.data;
      rated = data.hasRated;
      nAvg = data.newAvg;
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('in catch of api rating: ', message);
    }
    oldAvgRating = rated ? nAvg : oldAvgRating;
    if (Array.isArray(posts)) {
      let updatedPosts = calculateAvgRating(
        posts,
        postId,
        parseInt(totalRaters),
        parseFloat(oldAvgRating),
        parseFloat(newRating),
        rated
      );
      setPosts((prevState) => (prevState = [...updatedPosts]));
    } else {
      let updatedPost = calculateSinglePostAvgRating(
        posts,
        postId,
        parseInt(totalRaters),
        parseFloat(oldAvgRating),
        parseFloat(newRating),
        rated
      );
      setPosts((prevState) => (prevState = { ...updatedPost }));
    }
    ToggleRatingModal();
  };

  const ToggleTipModal = (userId, videoId) => {
    setAmountReciever(userId);
    setPaymentVideoId(videoId);
    setTipError('');

    setShowTipModal(!showTipModal);
    setTip(0);
  };

  const _HandleChangeTip = ({ target }) => {
    const { value } = target;
    setTip(value);
  };

  const _HandleToggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  //FILTERS START HERE//

  const _HandleActiveGenericFilter = (active) => {
    setActiveGenericFilter(active);
    router.replace(`/search?active=${active}`);
    // active === 'All' || active === 'Posts' ? GetPosts() : GetUserProfiles();
  };

  let _ChangeCategoryFilter = ({ target }) => {
    const { value } = target;
    setCategory(value);
  };

  const _HandleAccountTypeFilter = (e) => {
    const { checked, name } = e.target;
    setAccountType({ ...account, [name]: checked });
  };

  const _HandleVideoTypeFilter = (e) => {
    const { checked, name } = e.target;
    setVideoType({ ...videoType, [name]: checked });
  };

  const _HandleVideoCategoryFilter = (e) => {
    const { checked, name } = e.target;
    setVideoCategory({ ...videoCategory, [name]: checked });
  };

  //FILTERS END HERE//

  const HandleLikePost = async (id, isLiked) => {
    const updatedPosts = await checkLikeCount(posts, id, isLiked);
    setPosts(updatedPosts);
    try {
      await axiosInstance.likePost({ postId: id });
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('Like Post Api failed: ', message);
    }
  };

  const _HandleCommentCounts = async (postId, operator) => {
    const updatedPost = await checkCountById(posts, 'commentCount', postId, operator);
    setPosts(updatedPost);
  };

  let _OpenShareModal = (id, thumbnail, url, picture, name, title) => {
    setShareData({
      videoId: id,
      thumbnail,
      url,
      picture,
      name,
      title
    });
    setShowShareModal(true);
  };

  let _CloseShareModal = () => {
    setShowShareModal(false);
    setShareCaption('');
  };

  const _HandleSharePost = async () => {
    enableShareLoading();
    try {
      const {
        data: { data, message }
      } = await axiosInstance.sharePost({ caption: shareCaption, videoId: shareData?.videoId });
      GetPosts();
      Swal.fire({
        text: message,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        showCancelButton: false
      });
      disableShareLoading();
      _CloseShareModal();
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('Share Post Api failed: ', message);
    }
  };

  const _HandleChangeCaption = ({ target }) => {
    const { value } = target;
    setShareCaption(value);
  };

  const _HandleRateFilter = (value) => {
    setRateFilter(value);
  };

  const _HandleClearRating = () => {
    setRateFilter(0);
  };

  return {
    _HandleAccountTypeFilter,
    handleTipSubmit,
    _HandleActiveGenericFilter,
    _HandleChangeTip,
    _HandleChangeRating,
    ToggleTipModal,
    ToggleRatingModal,
    _HandleGotoVideoDetails,
    _HandleGotoUserProfile,
    _HandleDeleteVideo,
    _HandleCatalogue,
    GetUserProfiles,
    GetPosts,
    filterSearch,
    posts,
    userProfiles,
    showRatingModal,
    showTipModal,
    activeGenericFilter,
    userProfileLoading,
    postsLoading,
    sort,
    setSort,
    account,
    setAccountType,
    videoCategory,
    videoType,
    rating,
    setRating,
    category,
    _ChangeCategoryFilter,
    HandleLikePost,
    tip,
    _HandleVideoTypeFilter,
    _HandleVideoCategoryFilter,
    _HandleToggleFilterModal,
    showFilterModal,
    _OpenShareModal,
    _HandleChangeCaption,
    _HandleSharePost,
    shareCaption,
    shareData,
    isSharing,
    showShareModal,
    _CloseShareModal,
    setShareCaption,
    OpenRatingModal,
    _SubmitRating,
    _TogglePaymentModal,
    showAmountModal,
    videoPayment,
    _HandleCommentCounts,
    rateFilter,
    _HandleRateFilter,
    _HandleClearRating,
    _FetchMoreData,
    hasMore,
    postViewOnVideo,
    paymentError,
    isPaying,
    paymentSubmit,
    tipError,
    showCelebration,
    setAmountReciever,
    HandleFavouritePost
  };
};

export default UseSearch;
