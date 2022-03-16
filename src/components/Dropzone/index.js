/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { isEmpty } from 'lodash';
import { faFileVideo, faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useS3Upload } from 'next-s3-upload';
import { CustomLoader, ProgressBar } from 'src/components';




const MyDropzone = ({ setMaterial, setMediaType, accept, heading, urls, Type, _DeleteImg,setDuration }) => {

    let { uploadToS3, files } = useS3Upload();
    const [videoSrc,setVideoSrc]=useState(null);
    const [uploading, setUploading] = useState(false);


    const onDrop = useCallback(async (acceptedFiles) => {
        
        let video = document.createElement('video');
        video.preload='metadata';
        video.onloadedmetadata = function (){
            window.URL.revokeObjectURL(video.src)
            setDuration(video.duration);
        }
        video.src = URL.createObjectURL(acceptedFiles[0]);
        // FOR SINGLE IMAGE/VIDEO //     
        for (let i = 0; i < acceptedFiles.length; i++) {
            setUploading(true);
            let file = acceptedFiles[0];
            let url = await uploadToS3(file);
            setMediaType(file);
            setMaterial(url.url);
            setUploading(false)
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div  {...getRootProps()}>
        <div id='video-placer' > </div>
            <input {...getInputProps()} multiple={false} accept={accept} />
            {
                isDragActive ?
                    <div className="flex flex-col w-full p-3 h-32">
                    </div>
                    :
                    uploading ?
                        <div className="flex flex-col justify-center items-center w-full">
                            {
                                !isEmpty(files) &&
                                <>
                                    <ProgressBar width={files[0].progress} />
                                    <p className="text-gray-700 text-center text-sm">{(files[0].progress).toFixed(0)}% Uploaded, please wait</p>
                                </>
                            }
                            {/* <CustomLoader /> */}
                        </div>
                        :
                        urls ?
                            <div className="flex w-full py-2 space-y-2">

                                <div className="flex w-full h-20 border-transparent bg-gray-100 rounded-md relative">
                                    {
                                        Type === 'image' ?
                                            <img src={urls} alt="photo" className="object-contain w-full" />
                                            :
                                            <video src={urls} className="w-full object-contain"></video>
                                    }
                                    <span onClick={() => _DeleteImg()}
                                        className="rounded-full w-5 h-5 absolute top-0 right-0 shadow-lg text-center bg-white danger
                                  flex justify-center items-center cursor-pointer">
                                        x
                                    </span>
                                </div>

                            </div>
                            :
                            <div className="space-y-3">
                                <div className="flex flex-col w-full justify-center items-center cursor-pointer border-transparent rounded-lg bg-gray-50 hover:bg-gray-200 p-2 space-y-2">
                                    <FontAwesomeIcon icon={faFileVideo} className="text-6xl text" />
                                    <div>
                                        <p className="text-center text-lg font-semibold">{heading}</p>
                                        <p className="text-gray-700 text-center text-sm">or drag and drop</p>
                                    </div>
                                </div>
                            </div>

            }
        </div>
    )
}

export default MyDropzone;