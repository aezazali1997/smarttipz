/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import { Button, Modal, Dropzone, InputField, LanguageInput } from 'components';
import { selectFields } from 'express-validator/src/select-fields';
import { isEmpty } from 'lodash';
import { getInputClasses } from 'helpers';

const NewsFeed = () => {

    const [showModal, setShowModal] = useState(false);
    const [files, setFile] = useState([]);
    const [urls, setUrls] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");

    console.log('selectedLanguage: ', selectedLanguage);

    let _OpenUploadModal = () => {
        setShowModal(!showModal);
    }

    let _DeleteImg = (index) => {
        let copyUrls = [...urls];
        let copyFiles = [...files];
        copyUrls.splice(index, 1);
        copyFiles.splice(index, 1);
        console.log(`copyUrls => ${copyUrls}, copyFiles => ${copyFiles}`)
        setFile(copyFiles);
        setUrls(copyUrls)
    }

    return (
        <div className="flex h-screen w-full justify-center items-center bg-gray-50">
            {/*SEO Support*/}
            <Helmet>
                <title>News Feed | Smart Tipz</title>
            </Helmet>
            {/*SEO Support End */}
            <div className="h-screen w-full py-5">
                <div className="mx-auto max-w-md py-4 px-5 shadow flex flex-col justify-center items-center 
                rounded-lg bg-white divide-y space-y-4">
                    <div className="flex py-2 px-3 bg-gray-100 h-11  rounded-xl w-full border-transparent">
                        <p className="text-gray-600">Select to upload Video / Image</p>
                    </div>
                    <div className="flex w-full justify-center items-center pt-3">
                        <Button
                            type="button"
                            onSubmit={_OpenUploadModal}
                            childrens={(
                                <>
                                    <FontAwesomeIcon icon={faImages} className="text-lg text-green-600" />
                                    <p className="text-gray-600">Photo/Video</p>
                                </>
                            )}
                            classNames="bg-white border border-transparent rounded-lg hover:bg-gray-100 py-2 px-4 flex
                                justify-center items-center cursor-pointer space-x-2"
                        />
                    </div>
                </div>
            </div>
            {
                showModal && (
                    <Modal
                        title="Upload Photo/Video"
                        body={(
                            <>
                                <div className="flex flex-col w-full py-2 space-y-3 h-96 overflow-y-auto px-2">
                                    <Dropzone
                                        filesObj={files}
                                        setFileObj={setFile}
                                        material={urls}
                                        setMaterial={setUrls}
                                        _DeleteImg={_DeleteImg}
                                    />
                                    {
                                        !isEmpty(urls) &&
                                        <div className="flex w-full py-2">
                                            <div className="grid grid-cols-5 gap-3">
                                                {
                                                    urls.map((url, index) => (
                                                        <div key={index} className="flex w-20 h-20 border-transparent bg-gray-100 rounded-md relative">
                                                            {
                                                                files[index].type.split('/')[0] === 'image' ?
                                                                    <img src={url} alt="photo" className="object-contain" />
                                                                    :
                                                                    <source src={url} type="video/mp4" />
                                                            }
                                                            <span onClick={() => _DeleteImg(index)} className="rounded-full w-5 h-5 absolute top-0 right-0 shadow-lg text-center bg-white danger 
                                                                flex justify-center items-center cursor-pointer">
                                                                x
                                                            </span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    }
                                    <div className="flex flex-col w-full">
                                        <InputField
                                            name={"title"}
                                            type={"text"}
                                            // value={formik.values.email}
                                            // onChange={formik.handleChange}
                                            // onBlur={formik.handleBlur}
                                            // error={formik.touched.email && formik.errors.email}
                                            // svg={(
                                            //     <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                            // )}
                                            inputClass={` border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                            label={'Title'}
                                        />
                                        {/* {formik.touched.email && formik.errors.email ? (
                                            <div className="text-red-700 text-sm mb-4" >{formik.errors.email}</div>
                                        ) : null} */}
                                        <div className={`floating-input relative mb-4`}>
                                            <textarea
                                                type="text"
                                                id="description"
                                                rows={3}
                                                maxLength={700}
                                                name="description"
                                                className={` border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3`}
                                                // value={formik.values.description}
                                                // onChange={formik.handleChange}
                                                // onBlur={formik.handleBlur}
                                                placeholder="name@example.com"
                                                autoComplete="off" />
                                            <label
                                                htmlFor="about"
                                                className="absolute top-0 left-0 px-2 py-3 text-sm pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                                                Description
                                            </label>
                                        </div>
                                        <div className={`floating-input mb-5 relative`}>
                                            <select
                                                type={'select'}
                                                id={'accountType'}
                                                name={'accountType'}

                                                className={` border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                                // value={formik.values.accountType}
                                                // onChange={formik.handleChange}
                                                // onBlur={formik.handleBlur}
                                                placeholder="name@example.com"
                                            >
                                                <option value="">Select Category</option>
                                                <option value="Business">Category 1</option>
                                                <option value="Personal">Category 2</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer ">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500 pointer-events-none" width="19.524" height="19.524" viewBox="0 0 19.524 19.524">
                                                    <path id="Icon_ionic-ios-arrow-dropdown-circle" data-name="Icon ionic-ios-arrow-dropdown-circle" d="M3.375,13.137a9.762,9.762,0,0,0,19.524,0c0-3.656-5.248-8.658-5.248-8.658a16.252,16.252,0,0,0-4.514-1.1A9.76,9.76,0,0,0,3.375,13.137ZM16.943,11.1s.929-.352,1.281,0a.9.9,0,0,1,.263.638.91.91,0,0,1-.268.643l-4.426,4.412a.9.9,0,0,1-1.248-.028L8.054,12.287a.906.906,0,0,1,1.281-1.281l3.806,3.844Z" transform="translate(-3.375 -3.375)" fill="#6d6d6d" />
                                                </svg>
                                            </div>
                                        </div>
                                        <LanguageInput
                                            setSelectedLanguage={setSelectedLanguage}
                                        />
                                        <div className="flex mb-4" >
                                            <label
                                                className="flex items-center text-sm cursor-pointer text  font-semibold">
                                                <input type="checkbox" color={'#714de1'} checked className="form-checkbox" />
                                                <span className="ml-2">I agree that this video/image does not contain any explicit content and is
                                                    safe for viewers</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        handleModal={_OpenUploadModal}
                        handleCancel={_OpenUploadModal}
                        confirmBtnType="button"
                        confirmButton="Upload"
                        handleConfirm={_OpenUploadModal}
                    />
                )
            }
        </div>
    )
}

export default NewsFeed;
