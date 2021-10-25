/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { faFileVideo, faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useS3Upload } from 'next-s3-upload';
import { isEmpty } from 'lodash';
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image';
import axios from 'axios';
const MyDropzone = ({ setMaterial, setMediaType, accept, heading }) => {

    let { uploadToS3 } = useS3Upload();

    const onDrop = useCallback(async (acceptedFiles) => {
        console.log('acceptedFiles:', acceptedFiles);
        // FOR SINGLE IMAGE/VIDEO //
        for (let i = 0; i < acceptedFiles.length; i++) {
            let file = acceptedFiles[0];
            setMediaType(file);
            console.log("file: ", file);
            setMaterial(URL.createObjectURL(file));
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