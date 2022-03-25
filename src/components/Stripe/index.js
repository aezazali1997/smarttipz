import React, { useState } from 'react';
import { SuccessTick } from 'src/assets/SVGs';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  ElementsConsumer,
  useStripe,
  useElements,
  CardElement,
  Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const Stripe = ({ setIsVerified, setCardToken, isVerified }) => {
  const [verifying, setVerifying] = useState(false);
  const [verificationRequired, setverificationRequired] = useState(true);

  const stripe = useStripe();

  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
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
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <form className="flex flex-col justify-center">
          <div className="my-1">
            <div>
              <label>Enter Card Number</label>
              <CardNumberElement className="form-control resforminp" />
            </div>
            <div>
              <label>Enter Card Expiry</label>
              <CardExpiryElement className="form-control resforminp" />
            </div>
            <div>
              <label>Enter Card CVC</label>
              <CardCvcElement className="form-control resforminp" />
            </div>
          </div>
          <div className="my-1">
            <div className="flex justify-end">
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
  );
};

export default Stripe;
