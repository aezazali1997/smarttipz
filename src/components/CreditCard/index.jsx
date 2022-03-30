import React from 'react';

const CreditCard = ({ handleClick }) => {
  return (
    <div className="flex justify-center items-center my-1">
      <button className="w-40 btn  text-white py-2 px-2" onClick={handleClick}>
        {' '}
        Credit/Debit Cards
      </button>
    </div>
  );
};

export default CreditCard;
