import React from 'react';
import { Button, Modal, InputField } from 'src/components';

const WithDrawModal = ({
  handleWithDrawChange,
  withDrawSubmit,
  toggleWithDrawModal,
  amount,
  loading = false,
  modalTitle = 'Withdraw',
  error = '',
  onBoarded,
  generateLink,
  isGeneratingLink,
  link,
  proceed,
  renderSureModal,
  withDrawRequest
}) => {
  return (
    <>
      {onBoarded ? (
        <Modal
          _Toggle={toggleWithDrawModal}
          title={proceed ? 'Confirmation' : withDrawRequest ? 'Withdraw Request Successful' : modalTitle}
          body={
            <>
              <div className="flex h-full flex-col relative space-y-5 w-full justify-center items-center">
                <span className="flex flex-col justify-center items-center space-y-3">
                  <h1 className="text-lg text-center">
                    {proceed
                      ? `Are you sure you want to withdraw $${amount}?`
                      : withDrawRequest
                      ? 'It will take up to 5 working days for funds to appear in your  stripe account.'
                      : 'Withdraw funds from your wallet'}
                  </h1>
                </span>
                {proceed || withDrawRequest ? (
                  <></>
                ) : (
                  <>
                    <div className="flex w-full whitespace-preborder bg-gray-50 rounded-md h-12 mb-4">
                      <span className="bg-gray-50 text-md border border-r-0 rounded-md rounded-r-none font-bold border-gray-200 px-3 py-3  h-12">
                        $
                      </span>
                      <InputField
                        name={'With Draw'}
                        type={'number'}
                        value={amount > 0 ? amount : ''}
                        min={0}
                        onChange={(e) => handleWithDrawChange(Number(e.target.value))}
                        inputClass={`border bg-gray-50 text-sm border-gray-200  rounded-l-none focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                        label={'Amount'}
                      />
                    </div>
                    {error !== '' && <p className="text-left text-red-700">{error} </p>}
                  </>
                )}
              </div>
            </>
          }
          footer={
            <>
              {withDrawRequest ? (
                <></>
              ) : (
                <button
                  onClick={toggleWithDrawModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  {proceed ? 'No' : 'Cancel'}
                </button>
              )}

              <Button
                type="button"
                className={`w-full inline-flex justify-center rounded-md border-none px-4 py-2 text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm ${
                  amount > 0 && error === '' ? 'btn' : 'btn-disable'
                } `}
                childrens={proceed ? 'Yes' : withDrawRequest ? 'OK' : 'Proceed'}
                loading={loading}
                onClick={
                  proceed
                    ? () => {
                        renderSureModal();
                      }
                    : withDrawRequest
                    ? () => {
                        toggleWithDrawModal();
                      }
                    : () => {
                        withDrawSubmit();
                      }
                }
                disable={!(amount > 0 && error === '')}
              />
            </>
          }
        />
      ) : (
        <Modal
          _Toggle={toggleWithDrawModal}
          title="On Boarding Process"
          body={
            <>
              <div className="flex h-full flex-col relative space-y-5 w-full justify-center items-center">
                <span className="flex flex-col justify-center items-center space-y-3">
                  <h1 className="text-lg">
                    Click on the generate link button given below to get a Link for the <b>On Boarding Process</b>
                  </h1>
                </span>
              </div>
            </>
          }
          footer={
            <>
              <button
                onClick={toggleWithDrawModal}
                type="button"
                className="w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
              <Button
                type="button"
                className={`w-full inline-flex justify-center rounded-md border-none px-4 py-2 text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm btn
                } `}
                childrens={link === '' ? `Generate Link` : `Go to onBoarding Process`}
                loading={isGeneratingLink}
                onSubmit={generateLink}
                disable={false}
              />
            </>
          }
        />
      )}
    </>
  );
};
export default WithDrawModal;
