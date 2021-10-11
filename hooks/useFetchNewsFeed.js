import axiosInstance from 'APIs/axiosInstance';
import axios from 'axios';
import { useFormik } from 'formik';
import { useS3Upload } from 'next-s3-upload';
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { UploadVideoSchema } from 'utils/validation_shema';

const UseFetchNewsFeed = () => {

    const initials = {
        title: '',
        description: '',
        category: '',
        language: ''
    }

    const [showModal, setShowModal] = useState(false);
    const [files, setFile] = useState([]);
    const [urls, setUrls] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState(initials);

    let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();


    let thumbnailRef = useRef();

    let onChangeThumbnail = async ({ target }) => {
        const { files } = target;
        console.log("files: ", files);
        for (let i = 0; i < files.length; i++) {
            console.log('file: ', files[0]);
            let file = files[0];
            console.log("file: ", file);
            let fileParts = file.name.split(".");
            console.log('fileParts:', fileParts);
            let fileName = fileParts[0];
            console.log('fileName: ', fileName);
            let fileType = fileParts[1];
            console.log('fileType: ', fileType);
            try {
                const res = await axios
                    .post("/api/media-upload", {
                        fileName,
                        fileType
                    })
                const signedRequest = res.data.signedRequest;
                console.log('signedRequest: ', signedRequest);
                const url = res.data.url;
                console.log('url: ', url);
                setThumbnailUrl(url);

                let options = {
                    headers: {
                        "Content-Type": fileType
                    }
                };
                try {
                    const response = await axios
                        .put(signedRequest, file, options)
                    console.log('response: ', response);
                } catch (e) {
                    console.log('error: ', e);
                }
            } catch (e) {
                console.log('error: ', e);
            }

        }
    }

    let _OnThumbnailClick = () => {
        thumbnailRef.current.click();
    }

    let _OnRemoveThumbnail = () => {
        setThumbnailUrl('');
    }

    let _ToggleUploadModal = () => {
        setUrls('');
        setThumbnailUrl('');
        setAgree(false);
        setSelectedLanguage('');
        setInitialValues(initials);
        setShowModal(!showModal);
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
        console.log('values => ', values);
        values.url = urls;
        values.thumbnail = thumbnailUrl;
        values.agree = agree;
        values.mediaType = 'video';
        console.log(values);
        try {
            const res = await axiosInstance.uploadNewsFeed(values)
            console.log(res);
            const { data: { message } } = res;
            Swal.fire({
                text: message,
                timer: 3000,
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false
            })
            resetForm(initials);
            setSubmitting(false);
            _ToggleUploadModal();
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
        },

    });


    return {
        formik, _HandleLanguageChange, selectedLanguage, _DeleteImg, ChangeAgreement, agree, files, urls,
        setUrls, setFile, showModal, _ToggleUploadModal, loading, thumbnailRef, _OnRemoveThumbnail,
        onChangeThumbnail, _OnThumbnailClick, thumbnailUrl, FileInput, openFileDialog
    }
}

export default UseFetchNewsFeed;
