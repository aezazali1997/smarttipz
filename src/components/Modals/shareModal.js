/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button, Rating, Modal, InputField, VideoPlayer } from 'src/components';

const TipModal = ({ _HandleChangeCaption, text, ToggleShareModal, loading, modalTitle, _HandleSubmit, shareData: data }) => {
    return (
        <>
            <Modal
                _Toggle={ToggleShareModal}
                title={modalTitle}
                body={(
                    <>
                        <div className="w-full flex flex-col h-96 overflow-y-auto space-y-4">
                            <div className="flex items-center border-b border-gray-500 py-2 mb-4">
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Write caption ..."
                                    aria-label="Full name"
                                />
                            </div>
                            <div className="share-modal-video-wrapper">
                                <VideoPlayer poster={data?.thumbnail} src={data?.url} />
                            </div>
                        </div>
                    </>
                )}
                footer={(
                    <>
                        {/* <button
                            onClick={ToggleTipModal}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button> */}
                        <Button
                            type="button"
                            onSubmit={_HandleSubmit}
                            className="w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                            childrens={'Post'}
                            loading={loading}
                        />
                    </>
                )}
            />
        </>
    )
}

export default TipModal;
