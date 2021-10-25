import axiosInstance from 'APIs/axiosInstance';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { useS3Upload } from 'next-s3-upload';
import { UploadVideoSchema } from 'utils/validation_shema';
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
    const [initialValues, setInitialValues] = useState(initials);

    let thumbnailRef = useRef();

    let onChangeThumbnail = async ({ target }) => {
        const { files } = target;
        // console.log("files: ", files);
        for (let i = 0; i < files.length; i++) {
            // console.log('file: ', files[0]);
            let file = files[0];
            setThumbnailFile(file)
            setThumbnailUrl(URL.createObjectURL(file));
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
        console.log({ language: value });
        setSelectedLanguage(value);
    }

    useEffect(() => { }, [urls])


    const _OnSubmit = async (values, setSubmitting, resetForm) => {
        setSubmitting(true);
        let url = await uploadToS3(MediaType);
        let thumbnail = '';
        if (thumbnailUrl !== '') {
            thumbnail = await uploadToS3(thumbnailFile);
            values.thumbnail = thumbnail.url;
        }
        else {
            values.thumbnail = '';
        }

        console.log('values => ', values);
        values.url = url.url;
        values.agree = agree;
        values.mediaType = 'video';
        console.log(values);
        try {
            const { data: { message } } = await axiosInstance.uploadNewsFeed(values)
            Swal.fire({
                text: message,
                timer: 3000,
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false
            })
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


    return {
        formik, _HandleLanguageChange, selectedLanguage, _DeleteImg, ChangeAgreement, agree, urls,
        setUrls, showModal, _OpenUploadModal, _CloseUploadModal, loading, thumbnailRef, _OnRemoveThumbnail,
        onChangeThumbnail, _OnThumbnailClick, thumbnailUrl, MediaType, setMediaType
    }
}

export default UseFetchNewsFeed;
