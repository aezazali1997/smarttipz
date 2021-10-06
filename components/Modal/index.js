import { Spinner } from 'components';
import React from 'react'

const Modal = ({ title, handleModal, body, confirmButton, handleConfirm, handleCancel, confirmBtnType, loading }) => {
    return (
        // <div className="fixed z-40 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        //     <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        //         <div onClick={() => handleModal()} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        //         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        //         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl md:max-w-3xl lg:max-w-6xl ">
        //             <div className="bg-gray-50 px-4 pt-5 sm:p-6 sm:px-1 sm:pb-4">
        //                 <div className="sm:flex sm:items-start">
        //                     <div className="mt-3 text-center sm:mt-0 sm:m-4 sm:text-left">
        //                         <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
        //                             {title}
        //                         </h3>
        //                         {body}
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        //                 <button onClick={() => handleCancel()} type='button' className="mt-3 w-full inline-flex justify-center hover:underline px-4 py-2 text-base font-medium text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
        //                     Cancel
        //                 </button>
        //                 {
        //                     confirmBtnType === 'button' ?
        //                         <button onClick={handleConfirm} type='button' className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn text-base font-medium text-white  focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
        //                             {confirmButton} {loading && <Spinner />}
        //                         </button> :
        //                         <button type='submit' className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white btn focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
        //                             {confirmButton} {loading && <Spinner />}
        //                         </button>
        //                 }
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="fixed z-40 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* <!--
                Background overlay, show/hide based on modal state.

                Entering: "ease-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
                Leaving: "ease-in duration-200"
                From: "opacity-100"
                To: "opacity-0"
    --> */}
                <div onClick={() => handleModal()} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {/* <!--
                Modal panel, show/hide based on modal state.

                Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
                Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start text-md font-sans font-semibold pb-4">
                            {title}
                        </div>
                        <div className="sm:flex">
                            {body}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={() => handleCancel()} type='button' className="mt-3 w-full inline-flex justify-center hover:underline px-4 py-2 text-base font-medium text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                        {
                            confirmBtnType === 'button' ?
                                <button onClick={handleConfirm} type='button' className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn text-base font-medium text-white  focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                                    {confirmButton} {loading && <Spinner />}
                                </button> :
                                <button type='submit' className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white btn focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                                    {confirmButton} {loading && <Spinner />}
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
