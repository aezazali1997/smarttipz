import { parseCookies } from 'nookies';
import React, { useState, useEffect } from 'react';
import { TopUpModal, WithDrawModal, StripeCheckoutModal } from 'src/components/Modals';
import { Email, LinkSVG, User, TopUp, WithDraw, Wallet } from 'src/assets/SVGs';
import { fixedWithoutRoundOff } from 'helpers';
const WalletPage = () => {
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    try {
      let {
        data: { balance }
      } = await axiosInstance.getUserBalance(localStorage.getItem('id'));
      setBalance(balance);
    } catch (error) {
      console.log('Error while getting user balance');
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-end px-4 py-2">
        <div className="flex flex-col sm:flex-row  sm:my-2  sm:space-x-2 order-2">
          <button
            onClick={() => toggleTopUpModal()}
            className="py-2 px-2 w-100 flex  justify-center sm:text-center lg:justify-start  items-center text-white text-md rounded-md btn my-1">
            <TopUp />
            Top up
          </button>

          <button
            onClick={() => toggleWithDrawModal()}
            className="px-2 py-2 flex justify-start sm:justify-center items-center text-white text-md rounded-md btn my-1">
            <WithDraw />
            Withdraw
          </button>
        </div>
        <div className="flex flex-col  items-center sm:flex-row">
          <div>
            <Wallet />
          </div>
          <div>
            <span className="sm:text-4xl sm:font-bold text-2xl my-1 sm:my-0 block">
              $ {fixedWithoutRoundOff(balance, 2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  if (!token)
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login'
      },
      props: {}
    };
  else {
    return { props: {} };
  }
};
export default WalletPage;
