import React, { useState, useEffect } from 'react';
import Modal from '../Modal';

import Stripe from '../Stripe';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axiosInstance from 'src/APIs/axiosInstance';
import { process } from 'postcss-flexbugs-fixes';
import { stripeFeeCal } from 'helpers';
import { motion } from 'framer-motion';
import moment from 'moment';
import { Lock } from 'src/assets/SVGs';
import Swal from 'sweetalert2';
const stripe_pk = process.env.NEXT_PUBLIC_STRIPE_PK;
import { Button } from 'src/components';
const StripeCheckoutModal = ({
  toggleCheckoutModal,
  topUp,
  handleTopUpChange,
  setBalance,

  // _HandleChangeTip,
  // tip = 0,
  // ToggleTipModal,
  // loading = 'false',
  modalTitle = 'Topup'
  // handleTipSubmit,
  // showCelebration,
  // tipError = ''
}) => {
  const stripe = loadStripe(stripe_pk);
  // const audioRef = useRef();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [cardToken, setCardToken] = useState('');
  const [email, setEmail] = useState('');

  const [finalAmount, setFinalAmount] = useState(0);

  useEffect(() => {
    setFinalAmount(stripeFeeCal(Number(topUp)));
    getEmail();
  }, []);
  const getEmail = async () => {
    try {
      const {
        data: {
          data: { email }
        }
      } = await axiosInstance.getEmail();
      setEmail(email);
    } catch (error) {
      console.log('ERROR! : ', error.message);
    }
  };
  const handleTopUpSubmit = async () => {
    setIsProcessing(true);
    const data = {
      amount: finalAmount.toString(),
      token: cardToken
    };

    try {
      const response = await axiosInstance.topUpStripe(data);
      if (response.status === 200) {
        let {
          data: { totalTipsAmount }
        } = await axiosInstance.topUpProfile(topUp, email);
        console.log('total tips', totalTipsAmount);
        setBalance(totalTipsAmount);
      }
    } catch (error) {
      console.log('error', error.message);
    }
    setIsProcessing(false);
    toggleCheckoutModal();
    Swal.fire({
      text: 'Your account has been top up',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
      showCancelButton: false
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          stiffness: 100,
          damping: 20
        }}
        exit={{ opacity: 0 }}
        className="fixed z-50 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            onClick={toggleCheckoutModal}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
            <div className="bg-white px-4 pt-5">
              <div>
                <h1 className="text-2xl font-sans font-semibold pb-4">{modalTitle}</h1>
              </div>

              <hr />
              <div className=" p-2">
                <h1 className="font-extrabold text-md px-2">Top up Summary</h1>
              </div>
              <div className="mt-2 border-b">
                <div className="flex justify-between px-2 mt-2">
                  <h1 className="font-bold text-lg"> Date</h1>
                  <h1> {moment(Date.now()).format('D/MM/YYYY')}</h1>
                </div>
                <div className="flex justify-between px-2 mt-2">
                  <div>
                    <h1 className="font-bold text-lg"> Total including fee</h1>
                    <span className="text-xs ml-1">Stripe secure payment (Fee inlcuded) </span>
                  </div>
                  <h1 className="text-right text-2xl font-bol">$ {finalAmount}</h1>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <div>
                    <h1 className="font-bold text-lg">Topup using</h1>{' '}
                  </div>
                  <div className="flex">
                    {' '}
                    <Lock /> secure{' '}
                  </div>
                </div>

                <div className="px-2 my-2">
                  <Elements stripe={stripe}>
                    <Stripe
                      setIsVerified={setIsVerified}
                      setCardToken={setCardToken}
                      isVerified={isVerified}
                      amount={finalAmount}
                      topUp={topUp}
                      email={email}
                      setBalance={setBalance}
                      toggleCheckoutModal={toggleCheckoutModal}
                    />
                  </Elements>
                </div>
              </div>
            </div>
            <div className=" py-3 px-6 flex flex-row-reverse ">
              {
                <>
                  <button
                    onClick={() => {
                      handleTopUpChange(0);
                      toggleCheckoutModal();
                    }}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                  <Button
                    // onClick={handleTipSubmit}
                    onClick={handleTopUpSubmit}
                    disable={!isVerified}
                    type="button"
                    className={`w-full inline-flex justify-center rounded-md border-none px-4 py-2 ${
                      isVerified ? 'btn' : 'btn-disable'
                    }   text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm `}
                    childrens={'Top Up'}
                    loading={isProcessing}
                  />
                </>
              }
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default StripeCheckoutModal;
