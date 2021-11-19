/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button, Rating, Modal, InputField } from 'src/components';

const TipModal = ({ _HandleChangeTip, tip, ToggleTipModal, loading, modalTitle }) => {
    return (
        <>
            <Modal
                _Toggle={ToggleTipModal}
                title={modalTitle}
                body={(
                    <>
                        <div className="w-full justify-center flex">
                            <div className="flex w-full whitespace-preborder bg-gray-50 rounded-md h-12 mb-4">
                                <span className="bg-gray-50 text-md border border-r-0 rounded-md rounded-r-none font-bold border-gray-200 px-3 py-3  h-12">
                                    $
                                </span>
                                <InputField
                                    name={"tip"}
                                    type={"number"}
                                    value={tip}
                                    min={0}
                                    onChange={_HandleChangeTip}
                                    inputClass={`border bg-gray-50 text-sm border-gray-200  rounded-l-none focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                    label={'Tip'}
                                />
                            </div>
                        </div>
                    </>
                )}
                footer={(
                    <>
                        <button
                            onClick={ToggleTipModal}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                        <Button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                            childrens={'Submit'}
                            loading={loading}
                        />
                    </>
                )}
            />
        </>
    )
}

export default TipModal;
