import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import axiosInstance from 'src/APIs/axiosInstance';
import { useSearchContext } from 'src/contexts';

const UseSearch = () => {


    const { filterSearch } = useSearchContext();
    const router = useRouter();
    const { asPath } = router;

    const [posts, setPosts] = useState([]);
    const [userProfiles, setUserProfiles] = useState([]);
    const [catalogueCount, setCatalogueCount] = useState(0);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [showTipModal, setShowTipModal] = useState(false);
    const [activeGenericFilter, setActiveGenericFilter] = useState('All');
    const [userProfileLoading, setUserProfileLoading] = useState(true);
    const [postsLoading, setPostsLoading] = useState(true);
    const [sort, setSort] = useState('DESC');
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);
    const [account, setAccountType] = useState({
        Personal: false,
        Business: false
    });
    const [videoCategory, setVideoCategory] = useState({
        Paid: false,
        Free: false
    });
    const [videoType, setVideoType] = useState({
        Reviews: false,
        Tips: false
    });



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


    let GetPosts = async () => {
        enablePostsLoading();
        try {
            const { data: { data: { videos } } } = await axiosInstance.getFilteredPosts(filterSearch, sort, category);
            setPosts(videos);
            var count = 0;
            for (let i = 0; i < videos.length; i++) {
                if (videos[i].catalogue === true && videos[i].UserId == parseInt(localStorage.getItem('id'))) {
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
            const { data: { data: { users } } } = await axiosInstance.getFilteredUserProfiles(filterSearch, sort);
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


    useEffect(() => {
        GetPosts();
        GetUserProfiles();
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
    }, [filterSearch, sort, category]);


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
                    item.catalogue = !catalogue;
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

    const ToggleRatingModal = () => {
        setShowRatingModal(!showRatingModal);
    }

    const _HandleChangeRating = (value) => {
        console.log('value: ', value);
    }

    const ToggleTipModal = () => {
        setShowTipModal(!showTipModal);
    }

    const _HandleChangeTip = (value) => {
        console.log('value: ', value);
    }

    //FILTERS//

    const _HandleActiveGenericFilter = (active) => {
        setActiveGenericFilter(active);
        router.replace(`/search?active=${active}`)
        active === 'All' || active === 'Posts' ? GetPosts() : GetUserProfiles();
    }

    const _HandleAccountTypeFilter = (e) => {
        const { checked, name } = e.target;
        console.log(`${checked}, ${name}`)
    }

    let _ChangeCategoryFilter = ({ target }) => {
        const { value } = target;
        console.log(value);
        setCategory(value);
    }

    return {
        _HandleAccountTypeFilter, _HandleActiveGenericFilter, _HandleChangeTip, _HandleChangeRating,
        ToggleTipModal, ToggleRatingModal, _HandleGotoVideoDetails, _HandleGotoUserProfile, _HandleDeleteVideo,
        _HandleCatalogue, GetUserProfiles, GetPosts, filterSearch, posts, userProfiles, showRatingModal,
        showTipModal, activeGenericFilter, userProfileLoading, postsLoading, sort, setSort, account,
        setAccountType, videoCategory, videoType, rating, setRating, category, _ChangeCategoryFilter
    }
}

export default UseSearch;
