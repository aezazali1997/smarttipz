/* eslint-disable @next/next/no-img-element */
import React,{useState} from 'react';
import { Helmet } from 'react-helmet';
import { parseCookies } from 'nookies';
import axios from 'axios';
import ReactToolTip from 'react-tooltip';
import { getInputClasses, fixedWithoutRoundOff } from 'helpers';
import { UseFetchSetting } from 'src/hooks';
import { AccountSetting, BusinessCard, Button, PhoneInput, InputField, Switch } from 'src/components';
import BankDetails from './components/BankDetails/index';
import { Email, LinkSVG, User, TopUp, WithDraw, Wallet } from 'src/assets/SVGs';
import { TopUpModal, WithDrawModal, StripeCheckoutModal } from 'src/components/Modals';
import { AnimatePresence } from 'framer-motion';

const Setting = ({ settings }) => {
  const {
    accountLoading,
    formik,
    personalInfo,
    personalLoading,
    imageUrl,
    businessCard,
    countryCode,
    _Update,
    _OnChange,
    _DeleteImg,
    handleFileChange,
    FileInput,
    openFileDialog,
    _ChangeCountryCode,
    onChangeBusinessWebsite,
    withDrawFunds,
    showTopUpModal,
    showWithDrawModal,
    toggleTopUpModal,
    toggleWithDrawModal,
    balance,
    setBalance,
    topUp,
    setTopUp,
    topUpSubmit,
    ToppingUp,
    withDraw,
    setWithDraw,
    isWithDrawing,
    withDrawError,
    showCheckout,
    toggleCheckoutModal,
    generateLink,
    isGeneratingLink,
    link
  } = UseFetchSetting(settings);

  const { id, name, email, about, accessible, showPhone, accountType, phone, username, showName, showUsername, tip } =
    personalInfo;

  const { website } = businessCard;

  const [hasBankDetails, setHasBankDetails] = useState(true);

  return (
    <div className="flex flex-col h-full w-full p-3 sm:p-5 ">
      {/*SEO Support*/}
      <Helmet>
        <title>Setting | Smart Tipz</title>
      </Helmet>
      {/*SEO Support End */}

      <div className="flex flex-col w-full">
        {/* section starts here*/}
        <div className="flex justify-between w-full px-2 py-1">
          <div className="relative space-y-2">
            <div className="rounded-2xl profilePic relative">
              {imageUrl ? (
                <img src={imageUrl} alt="Display Pic" className="rounded-2xl h-40 w-30 object-cover" />
              ) : (
                <img
                  className="rounded-full"
                  src="https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg"
                  alt=""
                />
              )}
            </div>
            <div className="flex w-full space-x-1">
              <FileInput onChange={handleFileChange} />

              <button
                onClick={openFileDialog}
                className="px-2 py-1 w-1/2 flex justify-center items-center text-white text-sm rounded-md btn">
                Upload
              </button>
              <button
                onClick={_DeleteImg}
                type="button"
                className="px-2 py-1 w-1/2 flex items-center justify-center text-white text-sm bg-red-600 rounded-md hover:bg-red-700">
                Remove
              </button>
            </div>
          </div>
          <div className="flex flex-col w-100">
            <div className="flex flex-col sm:flex-row justify-between sm:my-2  sm:space-x-2 order-2">
              <button
                onClick={() => toggleTopUpModal()}
                className="py-2 px-2 w-100 flex justify-start sm:justify-center  items-center text-white text-md rounded-md btn my-1">
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
            <div className="flex flex-col justify-center items-center sm:flex-row">
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
        {/* section ends here */}
        {/* section starts here */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row mt-10 w-full sm:divide-x-2">
            <div className="flex flex-col w-full lg:w-1/2 space-y-2 sm:px-3">
              <h1 className="text-lg font-semibold">
                {accountType === 'Business' ? 'Business' : 'Personal'} Information
              </h1>
              <div className="flex flex-col w-full">
                <div className="flex w-full justify-between space-x-3">
                  <InputField
                    name={'name'}
                    type={'text'}
                    value={name}
                    onChange={_OnChange}
                    svg={<User className="w-6 h-6 text-gray-500 " />}
                    inputClass={`border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                    label={accountType === 'Business' ? 'Business Name' : 'Name'}
                  />
                  {accountType === 'Personal' && (
                    <div className="flex items-center space-x-1">
                      <span>
                        <svg
                          data-tip
                          data-for="showName"
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <ReactToolTip id="showName" place="top" effect="solid" border={false} clickable={false}>
                          {showName ? 'Click to hide name in profile' : 'Click to display name in profile'}
                        </ReactToolTip>
                      </span>
                      <Switch name={'showName'} checked={showName} onChange={_OnChange} />
                    </div>
                  )}
                </div>
                <div className="flex w-full justify-between space-x-3">
                  <InputField
                    disabled={true}
                    name={'username'}
                    type={'text'}
                    value={username}
                    onChange={_OnChange}
                    svg={<User className="w-6 h-6 text-gray-500 " />}
                    inputClass={`border text-gray-400 bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12 `}
                    label={accountType === 'Business' ? 'Business Username' : 'Username'}
                  />
                  {accountType === 'Personal' && (
                    <div className="flex items-center space-x-1">
                      <span>
                        <svg
                          data-tip
                          data-for="showUsername"
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <ReactToolTip id="showUsername" place="top" effect="solid" border={false} clickable={false}>
                          {showUsername ? 'Click to hide username in profile' : 'Click to display username in profile'}
                        </ReactToolTip>
                      </span>
                      <Switch name={'showUserName'} checked={showUsername} onChange={_OnChange} />
                    </div>
                  )}
                </div>
                <InputField
                  disabled={true}
                  name={'email'}
                  type={'text'}
                  value={email}
                  onChange={_OnChange}
                  svg={<Email className="w-6 h-6 text-gray-500" />}
                  inputClass={`border text-gray-400 bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12 `}
                  label={accountType === 'Business' ? 'Business Email' : 'Email'}
                />
                <div className="flex w-full justify-between mb-5">
                  <div className="flex">
                    <PhoneInput value={countryCode} onChange={_ChangeCountryCode} />
                  </div>

                  <div className="flex items-center space-x-1">
                    <span>
                      <svg
                        data-tip
                        data-for="showPhone"
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      {showPhone ? (
                        <ReactToolTip id="showPhone" place="top" effect="solid" border={false} clickable={false}>
                          {showPhone ? 'Click to hide number' : 'Click to show number'}
                        </ReactToolTip>
                      ) : (
                        <></>
                      )}
                    </span>
                    <Switch name={'showPhone'} checked={showPhone} onChange={_OnChange} />
                  </div>
                </div>
                <div className="floating-input relative">
                  <textarea
                    type="text"
                    id="about"
                    rows={3}
                    maxLength={150}
                    name="about"
                    className={`border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3`}
                    value={about}
                    onChange={_OnChange}
                    placeholder="name@example.com"
                    autoComplete="off"
                  />
                  <label
                    htmlFor="about"
                    className="absolute top-0 left-0 px-2 py-3 h-full text-sm pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                    {accountType === 'Business' ? 'Business Intro' : 'About me'}
                  </label>
                </div>
                <p className="flex justify-end text-sm mb-5 w-full">{about?.length || 0} / 150</p>
                {accountType === 'Business' && (
                  <InputField
                    name={'website'}
                    type={'url'}
                    value={website}
                    onChange={onChangeBusinessWebsite}
                    svg={<LinkSVG className="w-6 h-6 text-gray-500" />}
                    inputClass={`border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                    label={'Business Website link'}
                  />
                )}
                <div className="flex w-full whitespace-preborder bg-gray-50 rounded-md h-12 mb-4">
                  <span className="bg-gray-50 text-md border border-r-0 rounded-md rounded-r-none font-bold border-gray-200 px-3 py-3  h-12">
                    $
                  </span>
                  <InputField
                    name={'tip'}
                    type={'number'}
                    value={tip}
                    min={0}
                    onChange={_OnChange}
                    inputClass={`border bg-gray-50 text-sm border-gray-200  rounded-l-none focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                    label={'Tip'}
                  />
                </div>

                <div className="flex w-full justify-between mb-5">
                  <p className="text-md font-normal">Private Messages</p>
                  <div className="flex items-center space-x-1">
                    <span>
                      <svg
                        data-tip
                        data-for="accessible"
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {accessible ? (
                        <ReactToolTip id="accessible" place="top" effect="solid" border={false} clickable={false}>
                          {accessible ? 'Click to disable messages' : 'Click to enable messages'}
                        </ReactToolTip>
                      ) : (
                        <></>
                      )}
                    </span>
                    <Switch name={'accessible'} checked={accessible} onChange={_OnChange} />
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center justify-end">
                <Button
                  onSubmit={_Update}
                  type="button"
                  loading={personalLoading}
                  childrens={'Update'}
                  classNames={'px-3 py-2 flex justify-center items-center text-white text-sm btn rounded-md '}
                />
              </div>

              <div className={accountType === 'Business' ? 'flex flex-col' : 'hidden'}>
                <AccountSetting accountLoading={accountLoading} formik={formik} getInputClasses={getInputClasses} />
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 mt-10 sm:mt-0 sm:px-3">
              <div className={accountType === 'Personal' ? 'flex flex-col' : 'hidden'}>
                <AccountSetting accountLoading={accountLoading} formik={formik} getInputClasses={getInputClasses} />
              </div>
              <div className={accountType === 'Business' ? 'flex flex-col space-y-2' : 'hidden'}>
                <h1 className="text-lg font-semibold">Contact Details</h1>
                <BusinessCard image={imageUrl} phone={phone} website={website || ''} name={name} email={email} />
              </div>
              <div className="flex flex-col space-y-2">
                <BankDetails setHasBankDetails={setHasBankDetails} />
              </div>
            </div>
          </div>
        </div>
        {/* section ends here */}
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
            hasBankDetails={hasBankDetails}
            onBoarded={personalInfo.onBoarded}
            generateLink={generateLink}
            isGeneratingLink={isGeneratingLink}
            link={link}
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
            personalInfo={personalInfo}
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
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/profile`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    const { data } = res.data;
    return {
      props: {
        settings: data
      }
    };
  }
};
export default Setting;
