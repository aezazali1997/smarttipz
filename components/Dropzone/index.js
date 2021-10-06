/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image';

const MyDropzone = ({ filesObj, setFileObj, material, setMaterial, _DeleteImg }) => {


    const onDrop = useCallback(acceptedFiles => {
        console.log({ acceptedFiles });
        // FOR SINGLE IMAGE/VIDEO //
        // setFileObj(acceptedFiles);
        // let fileArray = [];
        // for (let i = 0; i < acceptedFiles.length; i++) {
        //     fileArray.push(URL.createObjectURL(acceptedFiles[i]))
        // }
        // setMaterial([...fileArray]);

        // For multiple Images/Videos //
        let fileArray = [];
        setFileObj([...filesObj, ...acceptedFiles]);
        for (let i = 0; i < acceptedFiles.length; i++) {
            fileArray.push(URL.createObjectURL(acceptedFiles[i]))
        }
        setMaterial([...material, ...fileArray]);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} multiple={true} accept="image/*,video/*" />
            {
                isDragActive ?
                    <div className="flex flex-col w-full p-3 h-32">
                    </div>
                    :
                    <div className="space-y-3">
                        <div className="flex flex-col w-full justify-center items-center cursor-pointer border-transparent rounded-lg bg-gray-50 hover:bg-gray-200 p-2 space-y-2">
                            <FontAwesomeIcon icon={faImages} className="text-6xl text-green-600" />
                            <div>
                                <p className="text-center text-lg font-semibold">Add Photo/Video</p>
                                <p className="text-gray-700 text-center text-sm">or drag and drop</p>
                            </div>
                        </div>


                    </div>
            }
        </div>
    )
}

export default MyDropzone;