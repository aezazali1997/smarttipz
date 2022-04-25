import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useS3Upload } from 'next-s3-upload';
import axiosInstance from 'src/APIs/axiosInstance';
import { UploadSmartReviewVideoSchema, UploadSmartTipzVideoSchema, UploadVideoSchema } from 'utils/validation_shema';
import { calculateAvgRating, checkCount, checkCountById, checkLikeCount } from 'helpers';

const UseFetchNewsFeed = () => {
  const router = useRouter();

  const initials = {
    // title: '',
    description: '',
    category: '',
    language: '',
    videoCost: '',
    productLink: '',
    minute: 0,
    second: 0,
    cost: 0
  };

  const initialRatingData = {
    postId: '',
    oldAvgRating: '',
    newRating: '',
    totalRaters: ''
  };

  let { uploadToS3 } = useS3Upload();
  const [tip, setTip] = useState(0);
  const [urls, setUrls] = useState('');
  const [posts, setPosts] = useState([]);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareData, setShareData] = useState({});
  const [videoType, setVideoType] = useState('');
  const [MediaType, setMediaType] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postOnFeed, setPostOnFeed] = useState(true);
  const [shareCaption, setShareCaption] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [catalogueCount, setCatalogueCount] = useState(0);
  const [showTipModal, setShowTipModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [initialValues, setInitialValues] = useState(initials);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const [isSubmitingRating, setIsSubmitingRating] = useState(false);

  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState('');
  const [isloadingFeed, setLoadingFeed] = useState(true);
  const [postRating, setSharePostRating] = useState(0);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [ratingData, setRatingData] = useState({ ...initialRatingData });
  const [current, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [amountReciever, setAmountReciever] = useState(null);
  const [paymentVideoId, setPaymentVideoId] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [userBalance, setUserBalance] = useState(null);
  const [tipError, setTipError] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [videoPayment, setVideoPayment] = useState(0);

  let thumbnailRef = useRef();

  const postViewOnVideo = async (VideoId) => {
    try {
      await axiosInstance.viewPost({ VideoId: VideoId });
    } catch (error) {
      console.log('ERROR:', error);
    }
  };

  const handleTipSubmit = async () => {
    if (localStorage.getItem('id') == amountReciever) {
      return;
    }
    if (tip > userBalance) {
      setTipError('You do not have the required amount. Please top up your Wallet.');
      return;
    }

    setShowCelebration(true);
    setIsPaying(true);
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
    } catch (error) {}
    setIsPaying(false);
    setShowCelebration(false);
    ToggleTipModal();
  };

  let GetPosts = async (currentPage) => {
    try {
      setLoadingFeed(true);
      const {
        data: {
          data: { videos, totalVideos, catalogCount }
        }
      } = await axiosInstance.getAllSharedVideos(currentPage);

      setPosts(videos);
      setCurrentPage((prev) => (prev = currentPage));
      videos.length >= totalVideos ? setHasMore(false) : setHasMore(true);

      setCatalogueCount(catalogCount);
      setLoadingFeed(false);
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log(message);
      setLoadingFeed(false);
    }
  };
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

  useEffect(() => {
    GetPosts(current);
    getBalance();
    return () => {
      setPosts([]);
      setCurrentPage(0);
      setHasMore(false);
      setCatalogueCount(0);
      setLoadingFeed(false);
      setUserBalance(0);
    };
  }, []);

  const _FetchMoreData = async () => {
    try {
      const {
        data: {
          data: { videos: moreVideos, totalVideos, catalogCount }
        }
      } = await axiosInstance.getAllSharedVideos(current + 1);
      localStorage.setItem('currentPageCount', current + 1);
      setCurrentPage(current + 1);
      setCatalogueCount(catalogCount);
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

  let onChangeThumbnail = async ({ target }) => {
    const { files } = target;
    for (let i = 0; i < files.length; i++) {
      setUploadingThumbnail(true);
      let file = files[0];

      setThumbnailFile(file);
      const { url } = await uploadToS3(file);
      setThumbnailUrl(url);
      setUploadingThumbnail(false);
    }
  };
  const paymentSubmit = async () => {
    if (videoPayment > userBalance) {
      setPaymentError('You do not have the required amount. Please top up your Wallet');
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
      // needs to update the original array of news feed that has a bolean so that user can view only that video and not other videos gets disrupted by this check.
      let tempPosts = [...posts];
      for (let i = 0; i < posts.length; i++) {
        if (tempPosts[i].VideoId === paymentVideoId) {
          tempPosts[i].hasPaid = true;
        }
      }
      setPosts(tempPosts);

      // uncomment this
      // setPaymentVideoId(null);

      // GetPosts(0);
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

  let _OnThumbnailClick = () => {
    thumbnailRef.current.click();
  };

  let _OnRemoveThumbnail = () => {
    setThumbnailFile('');
    setThumbnailUrl('');
  };

  let _OpenUploadModal = (videoType) => {
    setUrls('');
    setThumbnailUrl('');
    setThumbnailFile('');
    setAgree(false);
    setVideoType(videoType);
    setSelectedLanguage('');
    setInitialValues(initials);
    setShowModal(true);
  };

  let _CloseUploadModal = () => {
    setUrls('');
    setVideoType('');
    setThumbnailUrl('');
    setAgree(false);
    setShareCaption('');
    setPostOnFeed(true);
    setSelectedLanguage('');
    setShowModal(false);
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

  let _TogglePaymentModal = (cost, id = 0, UserId = 0) => {
    setVideoPayment(cost);
    setPaymentVideoId(id);
    setAmountReciever(UserId);
    setShowAmountModal(!showAmountModal);
    setPaymentError('');
  };

  let _CloseShareModal = () => {
    setShowShareModal(false);
    setShareCaption('');
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const enableShareLoading = () => {
    setIsSharing(true);
  };

  const disableShareLoading = () => {
    setIsSharing(false);
  };

  let ChangeAgreement = (e) => {
    const { checked } = e.target;
    setAgree(checked);
  };

  let _DeleteImg = () => {
    let copyUrls = '';
    setUrls(copyUrls);
  };

  let _HandleLanguageChange = (value) => {
    setSelectedLanguage(value);
  };

  // useEffect(() => {}, [urls, posts]);

  const _OnSubmit = async (values, setSubmitting, resetForm) => {
    setSubmitting(true);
    values.title = shareCaption;
    values.url = urls;
    values.agree = agree;
    values.mediaType = 'video';
    values.thumbnail = thumbnailUrl;
    values.videoType = videoType;
    values.isShowOnNewsfeed = postOnFeed;

    if (values.minute === 0 && values.second === 0) {
      values.watchLimit = 0;
      delete values.minute;
      delete values.second;
    } else {
      values.watchLimit = (values.minute * 60 + values.second) * 1000;
      delete values.minute;
      delete values.second;
    }

    try {
      const {
        data: { message }
      } = await axiosInstance.uploadNewsFeed(values);
      Swal.fire({
        text: message,
        timer: 3000,
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false
      });
      setCurrentPage(0);
      GetPosts(0);
      resetForm(initials);
      setSubmitting(false);
      _CloseUploadModal();
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('API Failed: ', message);
      Swal.fire({
        text: message,
        timer: 3000,
        icon: 'error',
        showCancelButton: false,
        showConfirmButton: false
      });
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: videoType === 'SmartTipz' ? UploadSmartTipzVideoSchema : UploadSmartReviewVideoSchema,
    validateOnBlur: true,
    onSubmit: (values, { setSubmitting, setStatus, resetForm }) => {
      _OnSubmit(values, setSubmitting, resetForm);
    }
  });

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

  const HandleFavouritePost = async (id) => {
    try {
      const {
        data: {
          data: { isFavourite },
          message
        }
      } = await axiosInstance.favouritePost({ videoId: id });

      // sets the icon color changing effect
      let tmpposts = posts;
      for (let i = 0; i < tmpposts.length; i++) {
        if (tmpposts[i].VideoId === id) {
          tmpposts[i].isFavourite = !tmpposts[i].isFavourite;
        }
      }
      setPosts([...tmpposts]);

      Swal.fire({
        icon: 'success',
        title: `${isFavourite ? 'Added to' : 'Removed from'} favourite`,
        text: `Video ${isFavourite ? 'Added to' : 'Removed from'} favourite section`,
        showCancelButton: false,
        showDenyButton: false,
        showConfirmButton: false,
        timer: 3000
      });
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('Like Post Api failed: ', message);
    }
  };

  const HandleCheckLike = (postLikes) => {};

  const _HandleCatalogue = async (videoId, catalogue) => {
    if (catalogueCount < 5 || catalogue === true) {
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
      try {
        await axiosInstance.addToCatalogue({ videoId, catalogue });
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
        // timer: 4000,
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
      //
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        buttonsStyling: false,
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          let res = await axiosInstance.deleteVideo(videoId);
          console.log('res in use fetch news', res);
          setCatalogueCount((catalogueCount) => catalogueCount - 1);
        },
        customClass: {
          confirmButton:
            'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
          cancelButton:
            'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          const originalArray = [...posts];
          let newArray = originalArray.map((item, i) => {
            if (item.Video.id !== videoId) return item;
            item.Video.isApproved = false;
            return item;
          });
          setPosts(newArray);
        }
      });
    } catch (err) {
      console.log('Api Failed: ', err.message);
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
    setShowRatingModal(false);
  };

  const _HandleChangeRating = (value) => {
    setSharePostRating(value);
    const copyRatingData = { ...ratingData };
    copyRatingData.newRating = value;
    setRatingData(copyRatingData);
  };

  const _SubmitRating = async () => {
    setIsSubmitingRating(true);
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
    const updatedPosts = calculateAvgRating(
      posts,
      postId,
      parseInt(totalRaters),
      parseFloat(oldAvgRating),
      parseFloat(newRating),
      rated
    );
    setIsSubmitingRating(false);
    ToggleRatingModal();
    setPosts((prevState) => (prevState = [...updatedPosts]));
  };

  const ToggleTipModal = (tip, id, UserId) => {
    if (UserId === undefined) {
      setShowTipModal(!showTipModal);
      return;
    }
    if (UserId !== undefined) {
      if (localStorage.getItem('id') == UserId) {
        // Swal.fire({
        //   text: 'You cannot tip your own video',
        //   timer: 3000,
        //   icon: 'error',
        //   showCancelButton: false,
        //   showConfirmButton: false
        // });
        return;
      }
    }
    setAmountReciever(UserId);
    setPaymentVideoId(id);
    setTip(tip);
    setShowTipModal(!showTipModal);
  };

  const _HandleChangeTip = ({ target }) => {
    const { value } = target;
    setTip(value);
  };

  const _HandleCommentCounts = async (postId, operator) => {
    const updatedPost = await checkCountById(posts, 'commentCount', postId, operator);
    setPosts(updatedPost);
  };

  const _HandleSharePost = async () => {
    const { videoId = '' } = shareData;
    enableShareLoading();
    try {
      const {
        data: { message }
      } = await axiosInstance.sharePost({ caption: shareCaption, videoId: videoId });
      // GetPosts(0);
      Swal.fire({
        text: message,
        icon: 'success',
        timer: 2000,
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

  const _HandleChangePostOnNewsfeed = () => {
    setPostOnFeed(!postOnFeed);
  };

  return {
    formik,
    _HandleLanguageChange,
    selectedLanguage,
    _DeleteImg,
    ChangeAgreement,
    agree,
    urls,
    setUrls,
    showModal,
    _OpenUploadModal,
    _CloseUploadModal,
    loading,
    thumbnailRef,
    _OnRemoveThumbnail,
    onChangeThumbnail,
    _OnThumbnailClick,
    thumbnailUrl,
    MediaType,
    setMediaType,
    _HandleGotoUserProfile,
    uploadingThumbnail,
    posts,
    HandleLikePost,
    HandleCheckLike,
    _HandleCatalogue,
    _HandleDeleteVideo,
    _HandleGotoVideoDetails,
    showRatingModal,
    ToggleTipModal,
    _HandleChangeTip,
    showTipModal,
    videoType,
    _OpenShareModal,
    _CloseShareModal,
    showShareModal,
    shareData,
    _HandleSharePost,
    _HandleChangeCaption,
    shareCaption,
    setShareCaption,
    isSharing,
    HandleFavouritePost,
    _HandleChangePostOnNewsfeed,
    postOnFeed,
    tip,
    isloadingFeed,
    OpenRatingModal,
    ToggleRatingModal,
    _HandleChangeRating,
    postRating,
    _SubmitRating,
    _TogglePaymentModal,
    showAmountModal,
    videoPayment,
    _HandleCommentCounts,
    ratingData,
    hasMore,
    _FetchMoreData,
    isSubmitingRating,
    postViewOnVideo,
    paymentSubmit,
    handleTipSubmit,
    showCelebration,
    isPaying,
    paymentError,
    tipError
  };
};

export default UseFetchNewsFeed;
