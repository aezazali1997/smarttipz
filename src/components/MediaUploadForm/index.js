/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useState,useEffect } from 'react';
import { isEmpty } from 'lodash';
// import Image from 'next/image';
import { getInputClasses } from 'helpers';
import { Modal, Button, InputField, Dropzone, EmojiInput, Switch } from 'src/components';
import ReactTooltip from 'react-tooltip';

const Index = ({
  formik,
  thumbnailUrl,
  _OnThumbnailClick,
  urls,
  _DeleteImg,
  ChangeAgreement,
  agree,
  setUrls,
  _CloseUploadModal,
  thumbnailRef,
  onChangeThumbnail,
  _OnRemoveThumbnail,
  MediaType,
  setMediaType,
  accept,
  title,
  heading,
  uploadingThumbnail,
  setShareCaption,
  shareCaption,
  _HandleChangePostOnNewsfeed,
  checkPostOnFeed,
  videoType
}) => {
  const [videoDuration, setVideoDuration] = useState(0);
  const [haswatchLimitError, setHasWatchLimitError] = useState(false);
  
  let Type = MediaType?.type.split('/')[0];
  useEffect(() => {
    let seconds = (formik.values.minute * 60) + formik.values.second
   
    if(Math.floor(seconds) > videoDuration/2 ){
      setHasWatchLimitError(true)
    }
    return () => {
      setHasWatchLimitError(false)
    }
  }, [formik.values.second,formik.values.minute])
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <Modal
        title={title}
        body={
          <>
            <div className="flex flex-col w-full py-2 space-y-3 h-96 overflow-y-auto px-2">
              <Dropzone
                heading={heading}
                accept={accept}
                setMediaType={setMediaType}
                setMaterial={setUrls}
                Type={Type}
                urls={urls}
                _DeleteImg={_DeleteImg}
                setDuration={setVideoDuration}
              />
              {isEmpty(urls) && <p className="danger text-sm">This is a required field</p>}
              {Type === 'video' && (
                <div className="flex flex-col space-y-1">
                  <input
                    type="file"
                    accept="image/*"
                    ref={thumbnailRef}
                    className="hidden"
                    onChange={onChangeThumbnail}
                  />
                  <div
                    className={`border bg-gray-50 text-sm border-gray-200 focus:outline-none
                                      rounded-md focus:shadow-sm w-full flex ${
                                        !isEmpty(thumbnailUrl) ? 'h-auto' : 'h-12'
                                      }`}>
                    <div className="flex justify-between w-2/3 rounded-md border rounded-r-none items-center">
                      {uploadingThumbnail ? (
                        <div className="flex justify-center items-center w-full">
                          <p className="text-gray-700 text-center text-sm">Uploading, please wait</p>
                        </div>
                      ) : !isEmpty(thumbnailUrl) ? (
                        <>
                          <div className="flex w-20 h-20 border-transparent bg-gray-100 rounded-md relative">
                            <img src={thumbnailUrl} alt="thumb" />
                          </div>
                          <span onClick={() => _OnRemoveThumbnail()}>
                            <svg
                              className="w-6 h-6 flex justify-center items-center rounded-md cursor-pointer hover:shadow-lg z-50"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </span>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                    <Button
                      type="button"
                      onSubmit={_OnThumbnailClick}
                      childrens={<p className="font-semibold">Upload Thumbnail</p>}
                      classNames="py-1 px-2 w-1/3 flex items-center justify-center rounded-l-none text-white btn rounded-md"
                    />
                  </div>

                  {isEmpty(thumbnailUrl) && <p className="text-gray-400 text-sm">This is a optional field</p>}
                </div>
              )}
              <div className="flex flex-col w-full">
                <div className={`w-full mb-5 space-y-1`}>
                  <EmojiInput message={shareCaption} setMessage={setShareCaption} placeholder={'Video Title'} />
                  {shareCaption === '' && <div className={`text-red-700 text-sm`}>This is a required field</div>}
                </div>
                {/* <InputField
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
								{formik.touched.title && formik.errors.title &&
									<div className="text-red-700 text-sm mb-4" >{formik.errors.title}</div>
								} */}
                <div
                  className={`floating-input relative
												${formik.touched.description && formik.errors.description ? 'mb-1' : 'mb-4'}`}>
                  <textarea
                    type="text"
                    id="description"
                    rows={3}
                    maxLength={700}
                    name="description"
                    className={`${getInputClasses(
                      formik,
                      'description'
                    )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3`}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="name@example.com"
                    autoComplete="off"
                  />
                  <label
                    htmlFor="about"
                    className="absolute top-0 left-0 px-2 py-3 text-sm pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                    Description
                  </label>
                </div>
                {formik.touched.description && formik.errors.description && (
                  <div div className="text-red-700 text-sm mb-4">
                    {formik.errors.description}
                  </div>
                )}
                {title === 'Upload Video' && (
                  <>
                    <div
                      className={`floating-input relative
                                                ${
                                                  formik.touched.category && formik.errors.category ? 'mb-1' : 'mb-4'
                                                }`}>
                      <select
                        type={'select'}
                        id={'category'}
                        name={'category'}
                        className={`${getInputClasses(
                          formik,
                          'category'
                        )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="name@example.com">
                        <option value="">Select Category</option>
                        <option value="Category1">Category 1</option>
                        <option value="Category2">Category 2</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-gray-500 pointer-events-none"
                          width="19.524"
                          height="19.524"
                          viewBox="0 0 19.524 19.524">
                          <path
                            id="Icon_ionic-ios-arrow-dropdown-circle"
                            data-name="Icon ionic-ios-arrow-dropdown-circle"
                            d="M3.375,13.137a9.762,9.762,0,0,0,19.524,0c0-3.656-5.248-8.658-5.248-8.658a16.252,16.252,0,0,0-4.514-1.1A9.76,9.76,0,0,0,3.375,13.137ZM16.943,11.1s.929-.352,1.281,0a.9.9,0,0,1,.263.638.91.91,0,0,1-.268.643l-4.426,4.412a.9.9,0,0,1-1.248-.028L8.054,12.287a.906.906,0,0,1,1.281-1.281l3.806,3.844Z"
                            transform="translate(-3.375 -3.375)"
                            fill="#6d6d6d"
                          />
                        </svg>
                      </div>
                    </div>
                    {formik.touched.category && formik.errors.category && (
                      <div className="text-red-700 text-sm mb-4">{formik.errors.category}</div>
                    )}
                    {videoType === 'SmartTipz' ? (
                      <>
                        <div
                          className={`floating-input relative ${
                            formik.touched.videoCost && formik.errors.videoCost ? 'mb-1' : 'mb-4'
                          }`}>
                          <select
                            type={'select'}
                            id={'videoCost'}
                            name={'videoCost'}
                            className={`${getInputClasses(
                              formik,
                              'videoCost'
                            )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                            value={formik.values.videoCost}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="name@example.com">
                            <option value="">Select Video</option>
                            <option value="Free">Free</option>
                            <option value="Paid">Paid</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-gray-500 pointer-events-none"
                              width="19.524"
                              height="19.524"
                              viewBox="0 0 19.524 19.524">
                              <path
                                id="Icon_ionic-ios-arrow-dropdown-circle"
                                data-name="Icon ionic-ios-arrow-dropdown-circle"
                                d="M3.375,13.137a9.762,9.762,0,0,0,19.524,0c0-3.656-5.248-8.658-5.248-8.658a16.252,16.252,0,0,0-4.514-1.1A9.76,9.76,0,0,0,3.375,13.137ZM16.943,11.1s.929-.352,1.281,0a.9.9,0,0,1,.263.638.91.91,0,0,1-.268.643l-4.426,4.412a.9.9,0,0,1-1.248-.028L8.054,12.287a.906.906,0,0,1,1.281-1.281l3.806,3.844Z"
                                transform="translate(-3.375 -3.375)"
                                fill="#6d6d6d"
                              />
                            </svg>
                          </div>
                        </div>
                        {formik.touched.videoCost && formik.errors.videoCost && (
                          <div className="text-red-700 text-sm mb-4">{formik.errors.videoCost}</div>
                        )}
                        {formik.values.videoCost === 'Paid' && (
                          <>
                            <div className="flex justify-between  items-center">
                              <div>
                                <p className="text-sm mr-2 lg:mr-0">Video watch limit</p>
                                
                                {videoDuration > 0 && (
                                  <span className="text-xs">
                                    Total Time: {Math.floor(videoDuration / 60)} :{Math.floor(videoDuration % 60)}
                                  </span>
                                )}
                              </div>
                              <div className="flex-col">
                                <div className="flex space-x-2">
                                  <>
                                    <InputField
                                      name={'minute'}
                                      type={'number'}
                                      min={0}
                                      max={999}
                                      timer={true}
                                      value={formik.values.minute}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      error={formik.touched.minute && formik.errors.minute}
                                      inputClass={`${getInputClasses(
                                        formik,
                                        'minute'
                                      )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                      label={'Minute'}
                                    />
                                    {formik.touched.minute && formik.errors.minute && (
                                      <div className="text-red-700 text-sm mb-4">{formik.errors.minute}</div>
                                    )}
                                  </>
                                  <>
                                    <InputField
                                      name={'second'}
                                      type={'number'}
                                      min={0}
                                      max={59}
                                      timer={true}
                                      value={formik.values.second}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      error={formik.touched.second && formik.errors.second}
                                      inputClass={`${getInputClasses(
                                        formik,
                                        'second'
                                      )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                      label={'Second'}
                                    />
                                    {formik.touched.second && formik.errors.second && (
                                      <div className="text-red-700 text-sm mb-4">{formik.errors.second}</div>
                                    )}
                                  </>
                                  <div></div>
                                </div>
                                {
                                  haswatchLimitError && <span className='text-sm text-red-700 my-1'>Watch limit exceeded half time</span>
                                }
                                
                              </div>
                            </div>
                            <div className="w-full justify-center flex">
                              <div className="flex w-full whitespace-preborder bg-gray-50 rounded-md h-12 mb-4">
                                <span className="bg-gray-50 text-md border border-r-0 rounded-md rounded-r-none font-bold border-gray-200 px-3 py-3  h-12">
                                  $
                                </span>
                                <InputField
                                  name={'cost'}
                                  type={'number'}
                                  min={'0'}
                                  value={formik.values.cost}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.touched.cost && formik.errors.cost}
                                  inputClass={`${getInputClasses(
                                    formik,
                                    'cost'
                                  )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                  label={'Cost'}
                                />
                                {formik.touched.cost && formik.errors.cost && (
                                  <div className="text-red-700 text-sm mb-4">{formik.errors.cost}</div>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <InputField
                          name={'productLink'}
                          type={'text'}
                          value={formik.values.productLink}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.productLink && formik.errors.productLink}
                          inputClass={`${getInputClasses(
                            formik,
                            'productLink'
                          )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                          label={'Product Link'}
                        />
                        {formik.touched.productLink && formik.errors.productLink && (
                          <div className="text-red-700 text-sm mb-4">{formik.errors.productLink}</div>
                        )}
                      </>
                    )}
                  </>
                )}
                {/* {
									title === 'Upload Photo/Video' &&
									<>
										<div className={`floating-input relative
                    						${formik.touched.mediaType && formik.errors.mediaType ? 'mb-1' : 'mb-4'}`}>
											<select
												type={'select'}
												id={'mediaType'}
												name={'mediaType'}
												className={`${getInputClasses(
													formik, "mediaType"
												)} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
												value={formik.values.mediaType}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												placeholder="name@example.com"
											>
												<option value="">Select MediaType</option>
												<option value="video">Video</option>
												<option value="image">Image</option>
											</select>
											<div className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer ">
												<svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500 pointer-events-none" width="19.524" height="19.524" viewBox="0 0 19.524 19.524">
													<path id="Icon_ionic-ios-arrow-dropdown-circle" data-name="Icon ionic-ios-arrow-dropdown-circle" d="M3.375,13.137a9.762,9.762,0,0,0,19.524,0c0-3.656-5.248-8.658-5.248-8.658a16.252,16.252,0,0,0-4.514-1.1A9.76,9.76,0,0,0,3.375,13.137ZM16.943,11.1s.929-.352,1.281,0a.9.9,0,0,1,.263.638.91.91,0,0,1-.268.643l-4.426,4.412a.9.9,0,0,1-1.248-.028L8.054,12.287a.906.906,0,0,1,1.281-1.281l3.806,3.844Z" transform="translate(-3.375 -3.375)" fill="#6d6d6d" />
												</svg>
											</div>
										</div>
										{formik.touched.mediaType && formik.errors.mediaType &&
											<div className="text-red-700 text-sm mb-4" >{formik.errors.mediaType}</div>
										}
									</>} */}
                <div
                  className={`floating-input relative ${
                    formik.touched.language && formik.errors.language ? 'mb-1' : 'mb-4'
                  }`}>
                  <select
                    type={'select'}
                    id={'language'}
                    name={'language'}
                    className={`${getInputClasses(
                      formik,
                      'language'
                    )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                    value={formik.values.language}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="name@example.com">
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-500 pointer-events-none"
                      width="19.524"
                      height="19.524"
                      viewBox="0 0 19.524 19.524">
                      <path
                        id="Icon_ionic-ios-arrow-dropdown-circle"
                        data-name="Icon ionic-ios-arrow-dropdown-circle"
                        d="M3.375,13.137a9.762,9.762,0,0,0,19.524,0c0-3.656-5.248-8.658-5.248-8.658a16.252,16.252,0,0,0-4.514-1.1A9.76,9.76,0,0,0,3.375,13.137ZM16.943,11.1s.929-.352,1.281,0a.9.9,0,0,1,.263.638.91.91,0,0,1-.268.643l-4.426,4.412a.9.9,0,0,1-1.248-.028L8.054,12.287a.906.906,0,0,1,1.281-1.281l3.806,3.844Z"
                        transform="translate(-3.375 -3.375)"
                        fill="#6d6d6d"
                      />
                    </svg>
                  </div>
                </div>
                {formik.touched.language && formik.errors.language && (
                  <div className="text-red-700 text-sm mb-4">{formik.errors.language}</div>
                )}

                <div className="flex justify-between mb-4">
                  <p className="text-sm">Post on Newsfeed</p>
                  <div
                    data-tip
                    data-for="post-visibility"
                    className="flex flex-col items-center justify-center divide-y-2 space-y-2">
                    <Switch name="toggleTestimonial" onChange={_HandleChangePostOnNewsfeed} checked={checkPostOnFeed} />
                    <ReactTooltip
                      className="max-w-md break-words"
                      id={`post-visibility`}
                      place="top"
                      effect="solid"
                      border={false}
                      borderColor="white"
                      clickable={false}>
                      {checkPostOnFeed ? 'Click to hide from newsfeed' : 'Click to show on newsfeed'}
                    </ReactTooltip>
                  </div>
                </div>
                <div className="flex mb-4">
                  <label className="flex items-center text-sm cursor-pointer text  font-semibold">
                    <input
                      type="checkbox"
                      color={'#714de1'}
                      checked={agree}
                      onChange={(e) => ChangeAgreement(e)}
                      className="form-checkbox"
                    />
                    <span className="ml-2">
                      I agree that this video/image does not contain any explicit content and is safe for viewers
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </>
        }
        footer={
          <>
            <button
              onClick={_CloseUploadModal}
              type="button"
              className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
            <Button
              type="submit"
              disable={
                MediaType === 'video'
                  ? !agree || isEmpty(thumbnailUrl) || isEmpty(urls) || isEmpty(shareCaption)
                  : !agree || isEmpty(urls) ||
                  haswatchLimitError
              }
              className={`w-full inline-flex justify-center rounded-md border-none px-4 py-2 text-base font-medium
                				${
                          formik.isSubmitting
                            ? 'btn-disable pointer-events-none'
                            : agree && !isEmpty(urls) && !isEmpty(shareCaption) && !haswatchLimitError
                            ? 'btn'
                            : 'btn-disable pointer-events-none'
                        }
								text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm`}
              childrens={formik.isSubmitting ? 'Uploading' : 'Upload'}
              loading={formik.isSubmitting}
            />
          </>
        }
        _Toggle={_CloseUploadModal}
      />
    </form>
  );
};

export default Index;
