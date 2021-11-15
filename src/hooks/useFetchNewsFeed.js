import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { useS3Upload } from 'next-s3-upload';
import { UploadVideoSchema } from 'utils/validation_shema';
import axiosInstance from 'src/APIs/axiosInstance';
import { isEmpty } from 'lodash';

const UseFetchNewsFeed = () => {

    const initials = {
        title: '',
        description: '',
        category: '',
        language: '',
        mediaType: ''
    }

    let { uploadToS3 } = useS3Upload();
    const [showModal, setShowModal] = useState(false);
    const [MediaType, setMediaType] = useState(null);
    const [urls, setUrls] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
    const [initialValues, setInitialValues] = useState(initials);
    const [posts, setPosts] = useState([]);
    const [catalogueCount, setCatalogueCount] = useState(0);
    let thumbnailRef = useRef();

    let GetPosts = async () => {
        try {
            const { data: { data: { videos } } } = await axiosInstance.getNewsFeedPosts();
            setPosts(videos);
            console.log(videos)
            var count = 0;
            for (let i = 0; i < videos.length; i++) {
                if (videos[i].catalogue === true && videos[i].UserId == parseInt(localStorage.getItem('id'))) {
                    count = count + 1;
                }
            }
            setCatalogueCount(count)
        }
        catch ({ response: { data: { message } } }) {
            console.log(message);
        }
    }

    console.log('catalogueCount', catalogueCount);

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

    let _OpenUploadModal = () => {
        setUrls('');
        setThumbnailUrl('');
        setThumbnailFile('')
        setAgree(false);
        setSelectedLanguage('');
        setInitialValues(initials);
        setShowModal(true);
    }

    let _CloseUploadModal = () => {
        setUrls('');
        setThumbnailUrl('');
        setAgree(false);
        setSelectedLanguage('');
        setShowModal(false);
    }

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };


    let ChangeAgreement = (e) => {
        const { checked } = e.target;
        setAgree(checked);
    }

    let _DeleteImg = () => {
        let copyUrls = '';
        // let copyFiles = [...files];
        // copyUrls.splice(index, 1);
        // copyFiles.splice(index, 1);
        setUrls(copyUrls)
        // setFile(copyFiles);
    }

    let _HandleLanguageChange = (value) => {
        setSelectedLanguage(value);
    }

    useEffect(() => { }, [urls, posts])


    const _OnSubmit = async (values, setSubmitting, resetForm) => {
        setSubmitting(true);
        // let url = await uploadToS3(MediaType);
        // let thumbnail = '';
        // if (thumbnailUrl !== '') {
        //     thumbnail = await uploadToS3(thumbnailFile);
        //     values.thumbnail = thumbnail.url;
        // }
        // else {
        //     values.thumbnail = '';
        // }

        values.url = urls;
        values.agree = agree;
        values.mediaType = 'video';
        values.thumbnail = thumbnailUrl;
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

    const HandleCheckLike = (postLikes) => {
        // if (postLikes) {
        //     const data = [];
        //     for (let post = 0; post < postLikes.length; post++) {
        //         if (postLikes[post].reviewerId == parseInt(localStorage.getItem('id'))) {
        //             data.push(postLikes[post]);
        //         }
        //     }
        //     if (!data) {
        //         return 'text-gray-600 hover:text-purple-600';
        //     }
        //     else {
        //         if (data[0].isLiked === true) {
        //             return 'text-purple-600';
        //         }
        //         else {
        //             return 'text-gray-600 hover:text-purple-600';
        //         }
        //     }
        // }
        // else {
        //     'text-gray-600 hover:text-purple-600'
        // }

    }


    const _HandleCatalogue = async (videoId, catalogue) => {
        if (catalogueCount < 5 || catalogue === true) {
            console.log('here: ', catalogueCount);
            try {
                const data = await axiosInstance.addToCatalogue({ videoId, catalogue });
                if (catalogue) {
                    setCatalogueCount(catalogueCount => catalogueCount - 1)
                }
                else {
                    setCatalogueCount(catalogueCount => catalogueCount + 1)
                }
                console.log({ data });
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


    return {
        formik, _HandleLanguageChange, selectedLanguage, _DeleteImg, ChangeAgreement, agree, urls,
        setUrls, showModal, _OpenUploadModal, _CloseUploadModal, loading, thumbnailRef, _OnRemoveThumbnail,
        onChangeThumbnail, _OnThumbnailClick, thumbnailUrl, MediaType, setMediaType,
        uploadingThumbnail, posts, HandleLikePost, HandleCheckLike, _HandleCatalogue, _HandleDeleteVideo
    }
}

export default UseFetchNewsFeed;
