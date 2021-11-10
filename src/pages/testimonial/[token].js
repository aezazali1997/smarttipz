/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import axios from 'axios';
import { useS3Upload } from 'next-s3-upload';
import { Button, Spinner, TestimonialForm } from 'src/components';
import { getInputClasses } from 'helpers';
import { AddTestimonialFormSchema } from 'utils/validation_shema';
import axiosInstance from 'src/APIs/axiosInstance';


const RequestTestimonial = ({ ownerEmail, username }) => {

    const router = useRouter();

    const initialValues = {
        ownerName: '',
        description: '',
        designation: ''
    }

    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const enableUploading = () => {
        setUploading(true);
    };

    const disableUploading = () => {
        setUploading(false);
    };

    let handleFileChange = async file => {
        enableUploading();
        let { url } = await uploadToS3(file);
        setImageUrl(url);
        disableUploading();
    };

    const _DeleteImg = () => {
        setImageUrl('');
    };

    const _HandleSubmit = async (res, resetForm) => {
        const { ownerName, designation, description } = res;
        enableLoading();
        const payload = {
            username,
            ownerName: ownerName,
            ownerEmail,
            designation: designation,
            description: description,
            picture: imageUrl
        };
        try {
            const { data: { message } } = await axiosInstance.addTestimonial(payload);
            swal({
                text: message,
                icon: 'success',
                timer: 4000,
                buttons: false
            })
            router.push('/auth/login');
            disableLoading()
        }
        catch ({ response: { data: { message } } }) {
            console.log('Error in Api Testimonial: ', message);
            swal({
                text: message,
                icon: 'error',
                timer: 4000,
                buttons: false
            })
            disableLoading();
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: AddTestimonialFormSchema,
        validateOnBlur: true,
        onSubmit: (res, { resetForm }) => {
            _HandleSubmit(res, resetForm)
        }
    })

    return (
        <div className="h-screen flex w-full justify-center items-center overflow-hidden">
            <div className="max-w-sm border shadow p-4 rounded-md">
                <form className="w-full" onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col w-full space-y-3">
                        <div className="flex flex-col space-y-2 w-full">
                            <div className="flex justify-center">
                                {
                                    imageUrl ?
                                        <img className="h-20 w-20 rounded-full object-cover "
                                            src={imageUrl}
                                            alt="testimonial"
                                        />
                                        :
                                        <img
                                            className="h-20 rounded-full object-cober w-20"
                                            src="https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg"
                                            alt=""
                                        />
                                }
                            </div>
                            <div className="flex w-full space-x-1">

                                <FileInput onChange={handleFileChange} />

                                <button
                                    type="button"
                                    onClick={openFileDialog}
                                    className="px-2 py-1 w-full flex justify-center items-center text-white text-sm btn rounded-md">
                                    Upload {
                                        uploading && (<Spinner />)
                                    }
                                </button>
                                <button
                                    type="button"
                                    onClick={_DeleteImg}
                                    className="px-2 py-1 w-full flex items-center justify-center text-white text-sm bg-red-600 rounded-md hover:bg-red-700">
                                    Remove
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <TestimonialForm
                                formik={formik}
                                getInputClasses={getInputClasses}
                            />
                        </div>
                        <Button
                            type="submit"
                            childrens={'Submit Testimonial'}
                            classNames={"px-3 py-2 flex justify-center items-center text-white text-sm btn rounded-md "}
                            loading={loading}

                        />
                    </div>
                </form>
            </div>
        </div>
    )
}


export const getServerSideProps = async (context) => {
    const { query: { token } } = context;
    try {
        const { data: { data: { ownerEmail, username } } } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}api/profile/testimonial/verify`, { token })
        return {
            props: {
                ownerEmail,
                username
            }
        }
    }
    catch (e) {
        return {
            redirect: {
                permanent: false,
                destination: "/auth/login",
            },
            props: {},
        }
    }
}

export default RequestTestimonial;
