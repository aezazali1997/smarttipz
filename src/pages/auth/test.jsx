import React, { useState } from 'react';

import StripeContainer from 'src/components/test/StripeContainer';

const test = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-6xl">Stripe Testing</h1>
        <StripeContainer />
      </div>
    </div>
  );
};

export default test;
