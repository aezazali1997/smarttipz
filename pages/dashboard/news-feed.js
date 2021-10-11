/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileVideo } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import { isEmpty } from 'lodash';
import { getInputClasses } from 'helpers';
import { Button, Modal, Dropzone, InputField, LanguageInput } from 'components';
import { UseFetchNewsFeed } from 'hooks';

const NewsFeed = () => {

  const { formik, _HandleLanguageChange, selectedLanguage, _DeleteImg, ChangeAgreement, agree, files, urls,
    setUrls, setFile, showModal, loading, _ToggleUploadModal, thumbnailRef, _OnRemoveThumbnail,
    onChangeThumbnail, _OnThumbnailClick, thumbnailUrl, openFileDialog, FileInput
  } = UseFetchNewsFeed();

  return (
    <div className="flex h-screen w-full justify-center items-center bg-gray-50">
      {/*SEO Support*/}
      <Helmet>
        <title>News Feed | Smart Tipz</title>
      </Helmet>
      {/*SEO Support End */}
      <div className="h-screen w-full py-5">
        <div className="mx-auto max-w-md  shadow flex flex-col justify-center 
                    rounded-lg bg-white divide-y space-y-4">
          <div className="space-y-3" onClick={_ToggleUploadModal}>
            <div className="flex flex-col w-full justify-center items-center cursor-pointer 
                        border-transparent rounded-lg hover:bg-gray-200 p-2 space-y-2">
              <FontAwesomeIcon icon={faFileVideo} className="text-6xl text" />
              <div>
                <p className="text-center text-lg font-semibold">Add Video</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      {
        showModal && (
          <form onSubmit={formik.handleSubmit}>
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
                      !isEmpty(urls) ?
                        <div className="flex w-full py-2">
                          <div className="grid grid-cols-5 gap-3">
                            {
                              /* urls.map((url, index) => ( */
                              <div className="flex w-20 h-20 border-transparent bg-gray-100 rounded-md relative">
                                {console.log('video: ', urls)}
                                {
                                  /* files[index].type.split('/')[0] === 'image' ?
                                      <img src={url} alt="photo" className="object-contain" />
                                      : */
                                  <video src={urls}></video>
                                }
                                <span onClick={() => _DeleteImg()} className="rounded-full w-5 h-5 absolute top-0 right-0 shadow-lg text-center bg-white danger 
                                                                flex justify-center items-center cursor-pointer">
                                  x
                                </span>
                              </div>

                            }
                          </div>
                        </div>
                        : <p className="danger text-sm">This is a required field</p>
                    }
                    <div className="flex flex-col space-y-1">
                      <input
                        type="file"
                        accept='image/*'
                        ref={thumbnailRef}
                        className="hidden"
                        onChange={onChangeThumbnail}
                      />
                      <div className={`border bg-gray-50 text-sm border-gray-200 focus:outline-none 
                                      rounded-md focus:shadow-sm w-full flex ${!isEmpty(thumbnailUrl) ? 'h-auto' : 'h-12'}`}>
                        <div className="flex justify-between w-2/3 rounded-md border rounded-r-none items-center">
                          {console.log('thumbNail', thumbnailUrl)}
                          {
                            !isEmpty(thumbnailUrl) &&
                            <div className="flex w-20 h-20 border-transparent bg-gray-100 rounded-md relative">
                              <img src={thumbnailUrl} alt="photo" layout="fill" objectFit="cover" />
                            </div>
                          }
                          {
                            !isEmpty(thumbnailUrl) &&
                            <span onClick={() => _OnRemoveThumbnail()}>
                              <svg className="w-6 h-6 flex justify-center items-center rounded-md cursor-pointer hover:shadow-lg z-50"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </span>
                          }
                        </div>
                        <Button
                          type='button'
                          onSubmit={_OnThumbnailClick}
                          childrens={(<p className="font-semibold">Upload Thumbnail</p>)}
                          classNames="py-1 px-2 w-1/3 flex items-center justify-center rounded-l-none text-white btn rounded-md"
                        />
                      </div>

                      {/* <Button
                                                type='button'
                                                onSubmit={_OnThumbnailClick}
                                                childrens={(
                                                    <>
                                                        <p className="text-sm font-white font-bold">Upload Video Thumbnail</p>&nbsp;
                                                        <svg className="w-4 h-4 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                        </svg>
                                                    </>
                                                )}
                                                classNames="p-2 w-auto flex mb-1 items-center text-white btn"
                                            /> */}
                      {isEmpty(thumbnailUrl) && <p className="danger text-sm">This is a required field</p>}
                    </div>
                    {/* <div onClick={_OnRemoveThumbnail}
                                            className={`${thumbnail === '' ? 'hidden' : 'flex border relative border-red-600 rounded-md p-1 w-full h-10'}`}>
                                            <p>{thumbnail?.name}  <svg className="w-6 h-6 flex justify-center items-center rounded-md absolute right-0 top-2 cursor-pointer hover:shadow-lg z-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg></p>
                                        </div> */}
                    <div className="flex flex-col w-full">
                      <InputField
                        name={"title"}
                        type={"text"}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.title && formik.errors.title}
                        inputClass={`${getInputClasses(
                          formik, "title"
                        )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                        label={'Title'}
                      />
                      {formik.touched.title && formik.errors.title ? (
                        <div className="text-red-700 text-sm mb-4" >{formik.errors.title}</div>
                      ) : null}
                      <div className={`floating-input relative 
                                                ${formik.touched.description && formik.errors.description ? 'mb-1' : 'mb-4'}`}>
                        <textarea
                          type="text"
                          id="description"
                          rows={3}
                          maxLength={700}
                          name="description"
                          className={`${getInputClasses(
                            formik, "description"
                          )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3`}
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="name@example.com"
                          autoComplete="off" />
                        <label
                          htmlFor="about"
                          className="absolute top-0 left-0 px-2 py-3 text-sm pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                          Description
                        </label>
                      </div>
                      {formik.touched.description && formik.errors.description ? (
                        <div className="text-red-700 text-sm mb-4" >{formik.errors.description}</div>
                      ) : null}
                      <div className={`floating-input relative 
                                                ${formik.touched.category && formik.errors.category ? 'mb-1' : 'mb-4'}`}>
                        <select
                          type={'select'}
                          id={'category'}
                          name={'category'}
                          className={`${getInputClasses(
                            formik, "category"
                          )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                          value={formik.values.category}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="name@example.com"
                        >
                          <option value="">Select Category</option>
                          <option value="Category1">Category 1</option>
                          <option value="Category2">Category 2</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer ">
                          <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500 pointer-events-none" width="19.524" height="19.524" viewBox="0 0 19.524 19.524">
                            <path id="Icon_ionic-ios-arrow-dropdown-circle" data-name="Icon ionic-ios-arrow-dropdown-circle" d="M3.375,13.137a9.762,9.762,0,0,0,19.524,0c0-3.656-5.248-8.658-5.248-8.658a16.252,16.252,0,0,0-4.514-1.1A9.76,9.76,0,0,0,3.375,13.137ZM16.943,11.1s.929-.352,1.281,0a.9.9,0,0,1,.263.638.91.91,0,0,1-.268.643l-4.426,4.412a.9.9,0,0,1-1.248-.028L8.054,12.287a.906.906,0,0,1,1.281-1.281l3.806,3.844Z" transform="translate(-3.375 -3.375)" fill="#6d6d6d" />
                          </svg>
                        </div>
                      </div>
                      {formik.touched.category && formik.errors.category ? (
                        <div className="text-red-700 text-sm mb-4" >{formik.errors.category}</div>
                      ) : null}
                      <div className={`floating-input relative 
                          ${formik.touched.language && formik.errors.language ? 'mb-1' : 'mb-4'}`}>
                        <select
                          type={'select'}
                          id={'language'}
                          name={'language'}
                          className={`${getInputClasses(
                            formik, "language"
                          )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                          value={formik.values.language}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="name@example.com"
                        >
                          <option value="">Select Language</option>
                          <option value="sq">shqiptar</option>
                          <option value="ar">العربية</option>
                          <option value="bn">বাংলা</option>
                          <option value="ch">中文</option>
                          <option value="nl">Nederlandse</option>
                          <option value="en">English</option>
                          <option value="fr">Français</option>
                          <option value="de">German</option>
                          <option value="gr">ελληνική</option>
                          <option value="gu">Avañe'ẽ</option>
                          <option value="hi">हिंदुस्तानी</option>
                          <option value="it">Italiano</option>
                          <option value="ko">한국어</option>
                          <option value="ms">Melayu</option>
                          <option value="fa">پارسی</option>
                          <option value="pt">Português</option>
                          <option value="ro">Română</option>
                          <option value="ru">русский</option>
                          <option value="sr">Српско-хрватски</option>
                          <option value="es">Español</option>
                          <option value="sw">Kiswahili</option>
                          <option value="sv">Swedish</option>
                          <option value="ta">தமிழ்</option>
                          <option value="tr">Türk</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer ">
                          <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500 pointer-events-none" width="19.524" height="19.524" viewBox="0 0 19.524 19.524">
                            <path id="Icon_ionic-ios-arrow-dropdown-circle" data-name="Icon ionic-ios-arrow-dropdown-circle" d="M3.375,13.137a9.762,9.762,0,0,0,19.524,0c0-3.656-5.248-8.658-5.248-8.658a16.252,16.252,0,0,0-4.514-1.1A9.76,9.76,0,0,0,3.375,13.137ZM16.943,11.1s.929-.352,1.281,0a.9.9,0,0,1,.263.638.91.91,0,0,1-.268.643l-4.426,4.412a.9.9,0,0,1-1.248-.028L8.054,12.287a.906.906,0,0,1,1.281-1.281l3.806,3.844Z" transform="translate(-3.375 -3.375)" fill="#6d6d6d" />
                          </svg>
                        </div>
                      </div>
                      {formik.touched.language && formik.errors.language ? (
                        <div className="text-red-700 text-sm mb-4" >{formik.errors.language}</div>
                      ) : null}
                      {/* <div className="mb-4">
                        <LanguageInput
                          classNames="border border-gray-200 flex justify-start items-center"
                          defaultLanguage={'en'}
                          handleChange={_HandleLanguageChange}
                        />
                      </div> */}
                      <div className="flex mb-4" >
                        <label
                          className="flex items-center text-sm cursor-pointer text  font-semibold">
                          <input type="checkbox" color={'#714de1'} checked={agree} onChange={(e) => ChangeAgreement(e)} className="form-checkbox" />
                          <span className="ml-2">I agree that this video/image does not contain any explicit content and is
                            safe for viewers</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
              footer={(
                <>
                  <button
                    onClick={_ToggleUploadModal}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-red-600 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    disable={!agree || isEmpty(thumbnailUrl) || isEmpty(urls)}
                    className={`w-full inline-flex justify-center rounded-md border-none px-4 py-2 text-base font-medium 
                              ${agree && !isEmpty(thumbnailUrl) && !isEmpty(urls) ? 'btn' : 'btn-disable pointer-events-none '} text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm`}
                    childrens={'Upload'}
                    loading={formik.isSubmitting}
                  />
                </>
              )}
              _Toggle={_ToggleUploadModal}
            />
          </form>
        )
      }
    </div>
  )
}

export default NewsFeed;
