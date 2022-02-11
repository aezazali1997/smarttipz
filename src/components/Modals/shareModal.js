/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button, EmojiInput, Modal, ReadLessReadMore, VideoPlayer } from 'src/components';

const ShareModal = ({
    setShareCaption,
    ToggleShareModal,
    loading = false,
    modalTitle = '',
    _HandleSubmit,
    shareData: data = {},
    shareCaption = ''
}) => {
    return (
        <>
            <Modal
                _Toggle={ToggleShareModal}
                title={modalTitle}
                body={
                    <>
                        <div className="w-full flex flex-col h-96">
                            <div className="flex items-center py-2 mb-4">
                                <EmojiInput
                                    message={shareCaption}
                                    setMessage={setShareCaption}
                                    placeholder={'Write your thoughts here ...'}
                                />
                                {/* <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="text"
                                    value={shareCaption}
                                    onChange={_HandleChangeCaption}
                                    placeholder={`Write your thoughts here ...`}
                                    aria-label="Full name"
                                /> */}
                            </div>
                            <div></div>
                            <div className=" overflow-y-auto rounded-lg share-modal-scrollbar px-2">
                                <div
                                    className={` max-w-lg shadow  flex flex-col justify-center rounded-lg
                                bg-white space-y-2`}>
                                    <div className="flex w-full py-2 px-2 space-x-1">
                                        <div className="flex space-x-2">
                                            <img src={data?.picture} className="rounded-full w-10 h-10 object-cover" alt="avatar"></img>
                                            <div className="flex flex-col w-full">
                                                <p className="text-sm font-bold font-sans">{data?.name}</p>
                                                <p className="text-xs text-gray-500">19h</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="px-5 text-sm w-full break-words">
                                        <ReadLessReadMore limit={45} text={data?.title || ''} />
                                    </p>
                                    <p className="text-sm break-words"></p>
                                    <div className="video-wrapper">
                                        <VideoPlayer poster={data?.thumbnail} src={data?.url} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
                footer={
                    <>
                        <button
                            onClick={ToggleShareModal}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                        <Button
                            type="button"
                            onSubmit={_HandleSubmit}
                            className="w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                            childrens={'Post'}
                            loading={loading}
                        />
                    </>
                }
            />
        </>
    );
};

export default ShareModal;
