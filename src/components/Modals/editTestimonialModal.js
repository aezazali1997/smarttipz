/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Modal, Spinner, TestimonialForm } from 'src/components';
import { getInputClasses } from 'helpers';

const EditTestimonialModal = ({ FileInput, imageUrl, formik, handleFileChange, _DeleteImg, openFileDialog, loading,
    uploading, handleShowModal, selectedId }) => {
    return (
        <>
            <form className="w-full" onSubmit={formik.handleSubmit}>
                <Modal
                    title={'Edit Testimonial'}
                    body={(

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
                                        className="px-2 py-1 w-full flex justify-center items-center text-white text-sm btn rounded-md ">
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
                            <div className="flex flex-col  w-full">
                                <TestimonialForm
                                    formik={formik}
                                    selectedId={selectedId}
                                    getInputClasses={getInputClasses}
                                />
                            </div>
                        </div>

                    )}
                    confirmButton={'Submit'}
                    confirmBtnType={'submit'}
                    handleCancel={handleShowModal}
                    handleModal={handleShowModal}
                    loading={loading}
                />
            </form>
        </>
    )
}

export default EditTestimonialModal;
