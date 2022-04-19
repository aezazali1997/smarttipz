import { parseCookies } from 'nookies';
import React, { useState, useEffect } from 'react';
import { TopUpModal, WithDrawModal, StripeCheckoutModal } from 'src/components/Modals';
import { Email, LinkSVG, User, TopUp, WithDraw, Wallet } from 'src/assets/SVGs';
import { fixedWithoutRoundOff } from 'helpers';
import axiosInstance from 'src/APIs/axiosInstance';
import { AnimatePresence } from 'framer-motion';
import { Spinner, Skeleton } from 'src/components';

const WalletPage = () => {
  // states
  const [balance, setBalance] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const [showWithDrawModal, setShowWithDrawModal] = useState(false);
  const [withDraw, setWithDraw] = useState(0);
  const [isWithDrawing, setIsWithDrawing] = useState(false);
  const [withDrawError, setWithDrawError] = useState('');
  const [link, setLink] = useState('');
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [ToppingUp, setToppingUp] = useState(false);
  const [topUp, setTopUp] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [withDrawRequest, setWithDrawRequest] = useState(false);

  // end states

  // functions
  const toggleCheckoutModal = () => {
    setShowCheckout(!showCheckout);
  };
  const toggleTopUpModal = () => {
    setShowTopUpModal(!showTopUpModal);
    setTopUp(0);
  };
  const toggleWithDrawModal = () => {
    setShowWithDrawModal(!showWithDrawModal);
    setWithDrawError('');
    setWithDraw(0);
    setProceed(false);
    setWithDrawRequest(false);
  };
  const renderSureModal = async () => {
    console.log('render sue modal');
    let email = userDetails.email;
    setIsWithDrawing(true);
    try {
      let {
        data: { totalTipsAmount }
      } = await axiosInstance.withDrawProfile(withDraw, email);
      setBalance(totalTipsAmount);
    } catch (error) {}
    setIsWithDrawing(false);
    setProceed(false);
    setWithDrawRequest(true);
  };
  const withDrawFunds = () => {
    if (withDraw > balance) {
      setWithDrawError('Amount exceeded balance');
      return;
    }
    setWithDrawError('');
    setProceed(true);
    // set withDrawRequest state to true
    // it should render the content with success message. it would take up to 5 working days
  };

  const topUpSubmit = async () => {
    setShowTopUpModal(!showTopUpModal);
    setShowCheckout(true);

    setToppingUp(false);
    setWithDrawError('');
  };

  const generateLink = async () => {
    if (link === '') {
      try {
        setIsGeneratingLink(true);
        let {
          data: {
            data: {
              accountLink,
              accountLink: { url }
            }
          }
        } = await axiosInstance.generateStripeAccountLink();
        setLink(url);
        let diff = accountLink.expires_at - accountLink.created;
      } catch (error) {
        console.log('ERROR: ', error.message);
      }
      setIsGeneratingLink(false);
    } else {
      let anchor = document.createElement('a');
      anchor.setAttribute('href', link);
      anchor.setAttribute('target', '_blank');
      anchor.click();
      setLink('');
    }
  };

  // END functions

  // get the user details
  const getUserDetails = async () => {
    try {
      const {
        data: {
          data: { userDetail }
        }
      } = await axiosInstance.getUserDetails();
      setUserDetails(userDetail);
    } catch (error) {
      console.log('Error while getting user details');
    }
  };
  // save the balance from user details
  const getBalance = async () => {
    setIsLoading(true);
    try {
      let {
        data: { balance }
      } = await axiosInstance.getUserBalance(localStorage.getItem('id'));
      setBalance(balance);
    } catch (error) {
      console.log('Error while getting user balance');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBalance();
    getUserDetails();
  }, [1]);

  return (
    <div className="w-100 h-screen">
      <div className=" flex flex-col justify-center items-center h-full">
        <div className="flex text-center items-center">
          <div>
            <Wallet />
          </div>
          <div>
            <span className="sm:text-4xl sm:font-bold text-2xl my-1 sm:my-0 block">
              {isLoading ? '' : '$'}
              {isLoading ? (
                <Skeleton bgColor="bg-gray-200" display="block" height="h-12" width="w-36" round="rounded-md" />
              ) : (
                fixedWithoutRoundOff(balance, 2)
              )}
            </span>
          </div>
        </div>
        <div className="flex mt-2">
          <button
            onClick={() => toggleTopUpModal()}
            className="px-2 mx-1 py-2 sm:w-40 w-32 flex justify-start sm:justify-center items-center text-white text-md rounded-md btn my-1">
            <TopUp />
            Top up
          </button>

          <button
            onClick={() => toggleWithDrawModal()}
            className="px-2 mx-1 py-2 sm:w-40 w-32   flex justify-start sm:justify-center items-center text-white text-md rounded-md btn my-1">
            <WithDraw />
            Withdraw
          </button>
        </div>
      </div>
      <AnimatePresence>
        {showWithDrawModal && (
          <WithDrawModal
            withDrawSubmit={withDrawFunds}
            handleWithDrawChange={setWithDraw}
            loading={isWithDrawing}
            toggleWithDrawModal={toggleWithDrawModal}
            amount={withDraw}
            modalTitle={'Withdraw'}
            error={withDrawError}
            onBoarded={userDetails.onBoarded}
            generateLink={generateLink}
            isGeneratingLink={isGeneratingLink}
            link={link}
            proceed={proceed}
            renderSureModal={renderSureModal}
            withDrawRequest={withDrawRequest}
          />
        )}
        {showTopUpModal && (
          <TopUpModal
            topUpSubmit={topUpSubmit}
            handleTopUpChange={setTopUp}
            loading={ToppingUp}
            toggleTopUpModal={toggleTopUpModal}
            amount={topUp}
            modalTitle={'Top up'}
          />
        )}
        {showCheckout && (
          <StripeCheckoutModal
            toggleCheckoutModal={toggleCheckoutModal}
            topUp={topUp}
            handleTopUpChange={setTopUp}
            setBalance={setBalance}
          />
        )}
      </AnimatePresence>
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
