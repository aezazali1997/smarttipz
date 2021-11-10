/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { faFileVideo, faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useS3Upload } from 'next-s3-upload';
import { isEmpty } from 'lodash';
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image';
import axios from 'axios';
import { CustomLoader } from 'src/components';


const MyDropzone = ({ setMaterial, setMediaType, accept, heading, urls, Type, _DeleteImg }) => {

    let { uploadToS3 } = useS3Upload();
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles) => {
        console.log('acceptedFiles:', acceptedFiles);
        // FOR SINGLE IMAGE/VIDEO //
        for (let i = 0; i < acceptedFiles.length; i++) {
            setUploading(true);
            let file = acceptedFiles[0];
            let url = await uploadToS3(file);
            console.log("file: ", url);
            setMediaType(file);
            setMaterial(url.url);
            setUploading(false)
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} multiple={false} accept={accept} />
            {
                isDragActive ?
                    <div className="flex flex-col w-full p-3 h-32">
                    </div>
                    :
                    uploading ?
                        <div className="flex flex-col justify-center items-center w-full">
                            <CustomLoader />
                            <p className="text-gray-700 text-center text-sm">Uploading, please wait</p>
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