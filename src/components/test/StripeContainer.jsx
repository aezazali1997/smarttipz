import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
const publish_key =
  'pk_test_51KWHDfCv9gKDdrr7IYUB9I9qS5mxFMHBEamgzJY3mcVAGAnYqUwFWJZgU1zu5TkVcaxXZaY33bqpP4LjEIeVTM2B00zYHSdMmG';

const secret_key =
  'sk_test_51KWHDfCv9gKDdrr7sacgZr10Jk7Eja2fCK1DecTje12NRi0N5HQZmFctUiPcCcCInYLl60KgysddD6fJYchpEpIz00oN6cax6l';

const options = {
  // passing the client secret obtained from the server
  clientSecret: secret_key
};

const stripePromise = loadStripe(publish_key);
const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};
export default StripeContainer;
