import React from 'react';

const PayPal = ({ handleClick }) => {
  return (
    <div className="flex justify-center items-center my-1">
      <button className="btn text-white w-40 px-2 py-2" onClick={handleClick}>
        Paypal
      </button>
    </div>
  );
};

export default PayPal;
