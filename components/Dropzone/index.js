/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { faFileVideo, faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image';
import axios from 'axios';

const MyDropzone = ({ setMaterial, setMediaType, accept, heading }) => {

    const onDrop = useCallback(async (acceptedFiles) => {
        console.log('acceptedFiles:', acceptedFiles);
        // FOR SINGLE IMAGE/VIDEO //
        for (let i = 0; i < acceptedFiles.length; i++) {
            let file = acceptedFiles[0];
            setMediaType(file);
            console.log("file: ", file);
            let fileParts = file.name.split(".");
            console.log('fileParts:', fileParts);
            let fileName = fileParts[0];
            console.log('fileName: ', fileName);
            let fileType = fileParts[1];

            console.log('fileType: ', fileType);
            try {
                const res = await axios
                    .post("/api/media-upload", {
                        fileName,
                        fileType
                    })
                const signedRequest = res.data.signedRequest;
                console.log('signedRequest: ', signedRequest);
                const url = res.data.url;
                console.log('url: ', url);
                setMaterial(url);

                let options = {
                    headers: {
                        "Content-Type": fileType
                    }
                };
                try {
                    const response = await axios
                        .put(signedRequest, file, options)
                    console.log('response: ', response);
                } catch (e) {
                    console.log('error: ', e);
                }
            }
            catch (e) {
                console.log('error: ', e);
            }
        }
        // setFileObj(acceptedFiles);
        // let fileArray = [];
        // for (let i = 0; i < acceptedFiles.length; i++) {
        //     fileArray.push(URL.createObjectURL(acceptedFiles[i]))
        // }
        // setMaterial([...fileArray]);

        // For multiple Images/Videos //
        // console.log({ filesObj });
        // let newFileArray = [...filesObj, ...acceptedFiles];
        // setFileObj(newFileArray);
        // console.log('newFileArray', newFileArray)
        // let fileArray = [];
        // console.log({ fileArray })
        // for (let i = 0; i < acceptedFiles.length; i++) {
        //     fileArray.push(URL.createObjectURL(acceptedFiles[i]))
        // }
        // console.log({ material })
        // let newMaterialArray = [...material, ...fileArray];
        // console.log('newMaterialArray', newMaterialArray)
        // setMaterial(newMaterialArray);
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