import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useS3Upload } from 'next-s3-upload';
import axiosInstance from 'src/APIs/axiosInstance';
import { UploadVideoSchema } from 'utils/validation_shema';

const UseFetchNewsFeed = () => {

    const router = useRouter();

    const initials = {
        // title: '',
        description: '',
        category: '',
        language: '',
        videoCost: '',
    }

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
    const [thumbnailFile, setThumbnailFile] = useState('');
    const [catalogueCount, setCatalogueCount] = useState(0);
    const [showTipModal, setShowTipModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [initialValues, setInitialValues] = useState(initials);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
    const [isloadingFeed, setLoadingFeed] = useState(true);
    const [ratePostId, setRatePostId] = useState('');
    const [postRating, setSharePostRating] = useState(0);

    let thumbnailRef = useRef();

    let GetPosts = async () => {
        try {
            setLoadingFeed(true);
            const { data: { data: { videos } } } = await axiosInstance.getAllSharedVideos();
            setPosts(videos);
            console.log(videos)
            var count = 0;
            for (let i = 0; i < videos.length; i++) {
                if (videos[i].Video.catalogue === true &&
                    videos[i].isShared === false &&
                    videos[i].Video.isApproved === true &&
                    videos[i].Video.UserId == parseInt(localStorage.getItem('id'))) {
                    count = count + 1;
                }
            }
            console.log('count: ', count);
            setCatalogueCount(count)
            setLoadingFeed(false);
        }
        catch ({ response: { data: { message } } }) {
            console.log(message);
            setLoadingFeed(false);
        }
    }


    useEffect(() => {
        GetPosts();
    }, [])


    let onChangeThumbnail = async ({ target }) => {
        const { files } = target;
        for (let i = 0; i < files.length; i++) {
            setUploadingThumbnail(true);
            let file = files[0];
            setThumbnailFile(file)
            const { url } = await uploadToS3(file)
            setThumbnailUrl(url);
            setUploadingThumbnail(false);
        }
    }

    let _OnThumbnailClick = () => {
        thumbnailRef.current.click();
    }

    let _OnRemoveThumbnail = () => {
        setThumbnailFile('');
        setThumbnailUrl('');
    }

    let _OpenUploadModal = (videoType) => {
        setUrls('');
        setThumbnailUrl('');
        setThumbnailFile('')
        setAgree(false);
        setVideoType(videoType);
        setSelectedLanguage('');
        setInitialValues(initials);
        setShowModal(true);
    }

    let _CloseUploadModal = () => {
        setUrls('');
        setVideoType('');
        setThumbnailUrl('');
        setAgree(false);
        setShareCaption('');
        setPostOnFeed(true);
        setSelectedLanguage('');
        setShowModal(false);
    }

    console.log('checked: ', postOnFeed)
    let _OpenShareModal = (id, thumbnail, url, picture, name, title) => {
        setShareData({
            videoId: id,
            thumbnail,
            url,
            picture,
            name,
            title
        })
        setShowShareModal(true);
    }

    let _CloseShareModal = () => {
        setShowShareModal(false);
        setShareCaption('');
    }

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
    }

    let _DeleteImg = () => {
        let copyUrls = '';
        setUrls(copyUrls)
    }

    let _HandleLanguageChange = (value) => {
        setSelectedLanguage(value);
    }

    useEffect(() => { }, [urls, posts])


    const _OnSubmit = async (values, setSubmitting, resetForm) => {
        setSubmitting(true);
        values.title = shareCaption;
        values.url = urls;
        values.agree = agree;
        values.mediaType = 'video';
        values.thumbnail = thumbnailUrl;
        values.videoType = videoType;
        values.isShowOnNewsfeed = postOnFeed;

        try {
            const { data: { message } } = await axiosInstance.uploadNewsFeed(values)
            Swal.fire({
                text: message,
                timer: 3000,
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false
            })
            GetPosts();
            resetForm(initials);
            setSubmitting(false);
            _CloseUploadModal();
        }
        catch ({ response: { data: { message } } }) {
            console.log('API Failed: ', message);
            Swal.fire({
                text: message,
                timer: 3000,
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: false
            })
            setSubmitting(false);
        }

    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: UploadVideoSchema,
        validateOnBlur: true,
        onSubmit: (values, { setSubmitting, setStatus, resetForm }) => {
            _OnSubmit(values, setSubmitting, resetForm);
        }
    });

    const HandleLikePost = async (id) => {
        try {
            const { data: { data, message } } = await axiosInstance.likePost({ videoId: id });
            console.log('success: ', message);
            GetPosts();
        }
        catch ({ response: { data: { message } } }) {
            console.log('Like Post Api failed: ', message);
        }
    }

    const HandleFavouritePost = async (id) => {
        console.log('id: ', id)
        try {
            const { data: { data, message } } = await axiosInstance.favouritePost({ videoId: id });
            console.log('success: ', message);
            GetPosts();
        }
        catch ({ response: { data: { message } } }) {
            console.log('Like Post Api failed: ', message);
        }
    }

    const HandleCheckLike = (postLikes) => {
        console.log('postLikes: ', postLikes);
    }

    const _HandleCatalogue = async (videoId, catalogue) => {
        if (catalogueCount < 5 || catalogue === true) {
            // console.log('here: ', catalogueCount);
            try {
                const data = await axiosInstance.addToCatalogue({ videoId, catalogue });
                if (catalogue) {
                    setCatalogueCount(catalogueCount => catalogueCount - 1)
                }
                else {
                    setCatalogueCount(catalogueCount => catalogueCount + 1)
                }
                // console.log({ data });
                const originalArray = [...posts];
                let newArray = originalArray.map((item, i) => {
                    if (item.id !== videoId) return item;
                    item.Video.catalogue = !catalogue;
                    return item;
                })
                setPosts(newArray)
            }
            catch ({ response: { data: { message } } }) {
                console.log('error in Api: ', message);
            }
        }
        else {
            Swal.fire({
                text: 'You can add only 5 videos in catalogue, please delete any to proceed',
                // timer: 4000,
                icon: 'info',
                showConfirmButton: true,
                showCancelButton: false,
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
                }
            })
        }
    }

    const _HandleDeleteVideo = async (index, videoId) => {
        try {
            const res = await axiosInstance.deleteVideo(videoId);
            setCatalogueCount(catalogueCount => catalogueCount - 1)
            const originalArray = [...posts];
            let newArray = originalArray.map((item, i) => {
                if (item.Video.id !== videoId) return item;
                item.Video.isApproved = false;
                return item;
            })
            // originalArray.splice(index, 1)
            setPosts(newArray);
        }
        catch ({ response: { data: { message } } }) {
            console.log('Api Failed: ', message);
        }
    }

    const _HandleGotoUserProfile = (id, username) => {
        if (id !== parseInt(localStorage.getItem('id'))) {
            router.push(`/dashboard/profile/${username}`);
        }
        else {
            router.push(`/dashboard/profile`);
        }
    }

    const _HandleGotoVideoDetails = (id) => {
        router.push(`/dashboard/videos/${id}`)
    }

    const OpenRatingModal = (postId) => {
        setRatePostId(postId);
        console.log('postToRate: ', postId);
        setShowRatingModal(true);
    }

    const ToggleRatingModal = () => {
        setShowRatingModal(false);
    }

    const _HandleChangeRating = (value) => {
        console.log('value: ', value);
        setSharePostRating(value);
    }

    const _SubmitRating = async () => {
        console.log({ postId: ratePostId, rating: postRating })
        try {
            const { data: { message } } = await axiosInstance.ratePost({ postId: ratePostId, rating: postRating });
            console.log('message: ', message);
            ToggleRatingModal();
        }
        catch ({ response: { data: { message } } }) {
            console.log('in catch of api rating: ', message);
        }
    }

    const ToggleTipModal = () => {
        setShowTipModal(!showTipModal);
    }

    const _HandleChangeTip = ({ target }) => {
        const { value } = target;
        setTip(value);
        console.log('value: ', value);
    }

    const _HandleSharePost = async () => {
        console.log(shareCaption, shareData);
        enableShareLoading();
        try {
            const { data: { data, message } } = await axiosInstance.sharePost({ caption: shareCaption, videoId: shareData?.videoId });
            console.log('success: ', message);
            GetPosts();
            Swal.fire({
                text: message,
                icon: 'success',
                timer: 3000,
                showConfirmButton: false,
                showCancelButton: false,
            })
            disableShareLoading();
            _CloseShareModal();
        }
        catch ({ response: { data: { message } } }) {

            console.log('Share Post Api failed: ', message);
        }
    }

    const _HandleChangeCaption = ({ target }) => {
        const { value } = target;
        console.log(value);
        setShareCaption(value);
    }

    const _HandleChangePostOnNewsfeed = () => {
        setPostOnFeed(!postOnFeed);
    }

    return {
        formik, _HandleLanguageChange, selectedLanguage, _DeleteImg, ChangeAgreement, agree, urls,
        setUrls, showModal, _OpenUploadModal, _CloseUploadModal, loading, thumbnailRef, _OnRemoveThumbnail,
        onChangeThumbnail, _OnThumbnailClick, thumbnailUrl, MediaType, setMediaType, _HandleGotoUserProfile,
        uploadingThumbnail, posts, HandleLikePost, HandleCheckLike, _HandleCatalogue, _HandleDeleteVideo,
        _HandleGotoVideoDetails, showRatingModal, ToggleTipModal,
        _HandleChangeTip, showTipModal, videoType, _OpenShareModal, _CloseShareModal, showShareModal, shareData,
        _HandleSharePost, _HandleChangeCaption, shareCaption, setShareCaption, isSharing, HandleFavouritePost,
        _HandleChangePostOnNewsfeed, postOnFeed, tip, isloadingFeed, OpenRatingModal, ToggleRatingModal,
        _HandleChangeRating, postRating, _SubmitRating
    }
}

export default UseFetchNewsFeed;
