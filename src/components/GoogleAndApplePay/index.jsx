import React from 'react';

const GoogleApplePay = ({ handleClick }) => {
  return (
    <div className="flex justify-center items-center my-1">
      <button className=" w-40 btn px-2 py-2 text-white" onClick={handleClick}>
        {' '}
        Google/Apple Pay
      </button>
    </div>
  );
};

export default GoogleApplePay;
