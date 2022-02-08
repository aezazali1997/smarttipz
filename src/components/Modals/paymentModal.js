/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Button, Modal, Celebration } from 'src/components';


const PaymentModal = ({ amount, ToggleAmountModal, loading = "false", modalTitle = "Pay Now" }) => {

    return (
        <Modal
            _Toggle={ToggleAmountModal}
            title={'Paid Video'}
            body={(
                <>
                    <div className="flex h-full flex-col relative space-y-5 w-full justify-center items-center">
                        <span className="flex flex-col justify-center items-center space-y-3">
                            <h1 className="text-lg">To continue watching video, please pay the amount:</h1>
                            <p className="text-2xl text-black font-bold">$ {amount} </p>
                        </span>
                        <Button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                            childrens={'PAY NOW'}
                            loading={loading}
                        />
                    </div>
                </>
            )}
        />
    )
}

export default PaymentModal;
