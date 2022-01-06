import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import axiosInstance from 'src/APIs/axiosInstance';
import { useSearchContext } from 'src/contexts';
import Swal from 'sweetalert2';

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
    const [ratePostId, setRatePostId] = useState('');
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


    useEffect(() => {

        const hideMenu = () => {
            if (window.innerWidth > 991 && showFilterModal) {
                setShowFilterModal(false);
                console.log('i resized');
            }
        };

        window.addEventListener('resize', hideMenu);

        return () => {
            window.removeEventListener('resize', hideMenu);
        };
    });

    //LOADERS START HERE//

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

    let GetPosts = async () => {
        enablePostsLoading();
        try {
            const { data: { data: { videos } } } = await axiosInstance.getFilteredPosts(filterSearch, sort, category, videoCategory, videoType, account);
            setPosts(videos);
            var count = 0;
            for (let i = 0; i < videos.length; i++) {
                if (videos[i].Video.catalogue === true && videos[i].isShared === false && videos[i].Video.UserId == parseInt(localStorage.getItem('id'))) {
                    count = count + 1;
                }
            }
            setCatalogueCount(count);
            disablePostsLoading();
        }
        catch ({ response: { data: { message } } }) {
            console.log(message);
            disablePostsLoading();
        }
    }

    let GetUserProfiles = async () => {
        enableProfileLoading();
        try {
            const { data: { data: { users } } } = await axiosInstance.getFilteredUserProfiles(filterSearch, sort, account);
            const deepCopyUsers = [...users];
            const filtered = deepCopyUsers.filter(user => user?.id !== parseInt(localStorage.getItem('id')) && user)
            setUserProfiles(filtered);
            console.log('users: ', filtered);
            disableProfileLoading();
        }
        catch ({ response: { data: { message } } }) {
            console.log(message);
            disableProfileLoading();
        }
    }

    const _CheckUrl = () => {
        if (!asPath.includes('?')) {
            router.push('/search?active=All');
        }
        else {

            const result = asPath.split('?')[1]
            const newResult = result.split('=');
            const key = newResult[0];
            const value = newResult[1];
            setActiveGenericFilter(value);
        }
    }

    useEffect(() => {
        GetPosts();
        GetUserProfiles();
        _CheckUrl()
    }, [filterSearch, sort, category, videoCategory, videoType, account]);


    const _HandleCatalogue = async (videoId, catalogue) => {
        if (catalogueCount < 5 || catalogue === true) {
            try {
                const data = await axiosInstance.addToCatalogue({ videoId, catalogue });
                if (catalogue) {
                    setCatalogueCount(catalogueCount => catalogueCount - 1)
                }
                else {
                    setCatalogueCount(catalogueCount => catalogueCount + 1)
                }
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
            originalArray.splice(index, 1)
            setPosts(originalArray);
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
        setRating(value);
    }

    const _SubmitRating = async () => {
        console.log({ postId: ratePostId, rating: rating })
        try {
            const { data: { message } } = await axiosInstance.ratePost({ postId: ratePostId, rating: rating });
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
        setTip(value)
        console.log('value: ', value);
    }


    const _HandleToggleFilterModal = () => {
        setShowFilterModal(!showFilterModal);
    }

    //FILTERS START HERE//

    const _HandleActiveGenericFilter = (active) => {
        setActiveGenericFilter(active);
        router.replace(`/search?active=${active}`)
        active === 'All' || active === 'Posts' ? GetPosts() : GetUserProfiles();
    }

    let _ChangeCategoryFilter = ({ target }) => {
        const { value } = target;
        console.log(value);
        setCategory(value);
    }

    const _HandleAccountTypeFilter = (e) => {
        const { checked, name } = e.target;
        const copyAccountType = { ...account };
        setAccountType({ ...copyAccountType, [name]: checked });
    }

    const _HandleVideoTypeFilter = (e) => {
        const { checked, name } = e.target;
        const copyVideoType = { ...videoType };
        setVideoType({ ...copyVideoType, [name]: checked });
    }

    const _HandleVideoCategoryFilter = (e) => {
        const { checked, name } = e.target;
        const copyVideoCategory = { ...videoCategory };
        setVideoCategory({ ...copyVideoCategory, [name]: checked });
    }

    //FILTERS END HERE//

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

    return {
        _HandleAccountTypeFilter, _HandleActiveGenericFilter, _HandleChangeTip, _HandleChangeRating,
        ToggleTipModal, ToggleRatingModal, _HandleGotoVideoDetails, _HandleGotoUserProfile, _HandleDeleteVideo,
        _HandleCatalogue, GetUserProfiles, GetPosts, filterSearch, posts, userProfiles, showRatingModal,
        showTipModal, activeGenericFilter, userProfileLoading, postsLoading, sort, setSort, account,
        setAccountType, videoCategory, videoType, rating, setRating, category, _ChangeCategoryFilter,
        HandleLikePost, tip, _HandleVideoTypeFilter, _HandleVideoCategoryFilter, _HandleToggleFilterModal, showFilterModal,
        _OpenShareModal, _HandleChangeCaption, _HandleSharePost, shareCaption, shareData, isSharing, showShareModal,
        _CloseShareModal, setShareCaption, OpenRatingModal, _SubmitRating
    }
}

export default UseSearch;
