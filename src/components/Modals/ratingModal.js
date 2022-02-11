/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button, Rating, Modal } from 'src/components';

const VideoRatingModal = ({ _SubmitRating, _HandleChangeRating, videoRating, ToggleRatingModal, loading, modalTitle,_isSubmiting }) => {
    return (
        <>
            <Modal
                _Toggle={ToggleRatingModal}
                title={modalTitle}
                body={(
                    <>
                        <div className="w-full justify-center items-center flex">
                            <Rating
                                onChange={_HandleChangeRating}
                                value={videoRating || 0}
                                edit={true}
                                isHalf={true}
                                size={30}
                            />
                        </div>
                    </>
                )}
                footer={(
                    <>
                        <button
                            onClick={ToggleRatingModal}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                        <Button
                            type="button"
                            onSubmit={_SubmitRating}
                            className="w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                            childrens={'Submit'}
                            loading={_isSubmiting}
                        />
                    </>
                )}
            />
        </>
    )
}

export default VideoRatingModal;
