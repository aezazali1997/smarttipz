import React, { useState, useEffect } from 'react';
import { SuccessTick } from 'src/assets/SVGs';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  ElementsConsumer,
  useStripe,
  useElements,
  PaymentRequestButtonElement
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axiosInstance from 'src/APIs/axiosInstance';

const Stripe = ({ setIsVerified, setCardToken, isVerified, amount }) => {
  const [verifying, setVerifying] = useState(false);
  const [verificationRequired, setverificationRequired] = useState(true);
  const stripe = useStripe();

  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    } else {
      makePayment();
    }
  }, [stripe]);
  const makePayment = async () => {
    let clientSecret = null;
    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: Number((amount * 100).toString().split('.')[0])
      },
      requestPayerName: true,
      requestPayerEmail: true
    });
    pr.canMakePayment().then(async (result) => {
      console.log(result);
      setPaymentRequest(pr);
      let {
        data: {
          data: { client_secret }
        }
      } = await axiosInstance.getClientSecret({
        amount
      });

      clientSecret = client_secret;
    });

    pr.on('paymentmethod', async (ev) => {
      console.log(clientSecret);
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: ev.paymentMethod.id
        },
        {
          handleActions: false
        }
      );
      if (confirmError) {
        ev.complete('fail');
      } else {
        ev.complete('success');

        if (paymentIntent.status === 'requires_action') {
          const { error } = await stripe.confirmCardPayment(clientSecret);
          if (error) {
            console.log('The payment failed -- ask your customer for a new payment method');
          } else {
            console.log('The payment has succeeded');
          }
        } else {
          console.log('The payment has succesded');
        }
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe) {
      return;
    }
    setVerifying(true);
    try {
      const cardElement = elements.getElement(CardNumberElement);
      const response = await stripe.createToken(cardElement);
      console.log('response', response);
      if (response.token) {
        setIsVerified(true);
        setverificationRequired(false);
        setCardToken(response.token.id);

        // show a success message that card is valid
      } else {
        //  setProcessing(false);
        //  setCardToken('');
        //  toast.warn(response?.error?.message);
        return;
      }
    } catch (ex) {
      console.log('Erorr', ex.message);
    }
    setVerifying(false);
  };

  return (
    <>
      <div className="my-2">{paymentRequest && <PaymentRequestButtonElement options={{ paymentRequest }} />}</div>
      <div className="relative w-full text-center horizontal-line">or</div>

      <ElementsConsumer>
        {({ stripe, elements }) => (
          <form className="">
            <div className="my-1">
              <div>
                <label>Enter Card Number</label>
                <CardNumberElement className="form-control w-full  border py-2 px-2" />
              </div>
              <div>
                <label>Enter Card Expiry</label>
                <CardExpiryElement className="form-control  border py-2 px-2" />
              </div>
              <div>
                <label>Enter Card CVC</label>
                <CardCvcElement className="form-control border py-2 px-2" />
              </div>
            </div>
            <div className="mb-3 flex justify-end items-end">
              <div>
                <button
                  disabled={!verificationRequired}
                  onClick={handleSubmit}
                  className={` ${
                    verificationRequired ? 'btn' : 'btn-disable'
                  } flex py-2 px-4 rounded-md text-white align-middle text-center w-auto`}
                  type="button">
                  Verify Card
                  {verifying && (
                    <div className=" ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </ElementsConsumer>
    </>
  );
};

export default Stripe;
