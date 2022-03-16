import React, { useState, useEffect } from 'react';
import { InputField, Button } from 'src/components';
import AxiosInstance from 'src/APIs/axiosInstance';
import { KeySVG, UserSVG, IBANSVG } from 'src/assets/SVGs';
import { getInputClasses } from 'helpers';
import { useFormik } from 'formik';
import {isEmpty} from 'lodash'
import validationSchema from './BankValidation/BankValidation';
import bankInitialValues from './BankValidation/initials';

const BankDetails = ({
    setHasBankDetails
}) => {
  const [bankData, setBankData] = useState(null);

  const getData = async () => {
    try {
      const {
        data: { data }
      } = await AxiosInstance.getBankDetails(localStorage.getItem('id'));
    //   setHasBankDetails()
    if(isEmpty(data)){
      setHasBankDetails(false)
       setBankData(null)
    }
    else{
      setBankData(data)
      setHasBankDetails(true);
    }
    } catch (error) {
      console.log(error.message);
      setHasBankDetails(false);
      setBankData(null);
    }
  };

  useEffect(() => {
    getData();
    return () => {
      setBankData(null);
      setHasBankDetails(false);
      }
  }, [1]);

  const initialValues = bankData || bankInitialValues;

  const onSubmit = async(values) => {
      const data = {
          id:localStorage.getItem('id'),
          ...values
      }
    setIsLoading(true);
    await AxiosInstance.saveBankDetails(data);
    setIsLoading(false);
    setHasBankDetails(true);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit,
    enableReinitialize: true
  });
  const { values,errors, touched, handleChange, handleSubmit, handleBlur } = formik;

  const [isLoading, setIsLoading] = useState(false);

  return (
    <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
      <h1 className="text-lg font-semibold">Bank Information</h1>
      <div className="flex flex-col w-full my-2">
        <InputField
          name={'accountTitle'}
          type={'text'}
          onChange={handleChange}
          value={values.accountTitle}
          onBlur={handleBlur}
          error={errors.accountTitle}
          svg={<UserSVG />}
          inputClass={`${getInputClasses(
            formik,
            'accountTitle'
          )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
          label={'Account Title'}
        />
        {touched.accountTitle && touched.accountTitle && (
          <div className="text-red-700 text-sm mb-4">{errors.accountTitle}</div>
        )}
 

        <InputField
          name={'IBAN'}
          type={'text'}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={values.IBAN}
          error={formik.touched.IBAN && formik.errors.IBAN}
          svg={<IBANSVG />}
          inputClass={`${getInputClasses(
            formik,
            'IBAN'
          )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
          label={'Account Title'}
        />
        {formik.touched.IBAN && formik.errors.IBAN && <div className="text-red-700 text-sm mb-4">{errors.IBAN}</div>}

        {/* <InputField
          name={'branchCode'}
          type={'text'}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.branchCode && formik.errors.branchCode}
          svg={<KeySVG className="w-6 h-6 text-gray-500" />}
          inputClass="border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12"
          label={'IBAN Number'}
        />
        {formik.touched.branchCode && formik.errors.branchCode && (
          <div className="text-red-700 text-sm mb-4">{'errors'}</div>
        )} */}
      </div>
      <div className="flex w-full items-center justify-end mt-10">
        <Button
          type="submit"
          loading={isLoading}
          childrens={'Update'}
          classNames={'px-3 py-2 flex justify-center items-center text-white text-sm btn rounded-md '}
        />
      </div>
    </form>
  );
};

export default BankDetails;
