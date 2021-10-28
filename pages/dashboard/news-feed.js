/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { faFileVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MediaUploadForm } from 'components';
import { UseFetchNewsFeed } from 'hooks';
import React from 'react';
import { Helmet } from 'react-helmet';

const NewsFeed = () => {

  const { formik, _DeleteImg, ChangeAgreement, agree, urls, setUrls, showModal,
    _OpenUploadModal, _CloseUploadModal, thumbnailRef, _OnRemoveThumbnail, onChangeThumbnail,
    _OnThumbnailClick, thumbnailUrl, MediaType, setMediaType,
    uploadingThumbnail,
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
          <div className="space-y-3" onClick={_OpenUploadModal}>
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
          <MediaUploadForm
            title={'Upload Video'}
            heading='Upload Video'
            urls={urls}
            agree={agree}
            formik={formik}
            accept={'video/*'}
            MediaType={MediaType}
            thumbnailUrl={thumbnailUrl}
            thumbnailRef={thumbnailRef}
            setUrls={setUrls}
            _DeleteImg={_DeleteImg}
            setMediaType={setMediaType}
            ChangeAgreement={ChangeAgreement}
            onChangeThumbnail={onChangeThumbnail}
            _OnThumbnailClick={_OnThumbnailClick}
            _CloseUploadModal={_CloseUploadModal}
            _OnRemoveThumbnail={_OnRemoveThumbnail}
            uploadingThumbnail={uploadingThumbnail}
          />
        )
      }

    </div>
  )
}

export default NewsFeed;
