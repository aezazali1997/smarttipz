import React from 'react'
import { InputField } from '..';
import Button from '../Button';

const AccountSetting = ({ formik, accountLoading, getInputClasses }) => {
    return (
        <>
            <h1 className="text-lg font-semibold">Account Information</h1>
            <div className="flex flex-col w-full">
                <InputField
                    name={"old"}
                    type={"password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.old && formik.errors.old}
                    svg={(
                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" /></svg>
                    )}
                    inputClass={`${getInputClasses(
                        "old"
                    )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                    label={'Old Password'}
                />
                {formik.touched.old && formik.errors.old ? (
                    <div className="text-red-700 text-sm mb-4" >{formik.errors.old}</div>
                ) : null}

                <InputField
                    name={"new"}
                    type={"password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.new && formik.errors.new}
                    svg={(
                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" /></svg>

                    )}
                    inputClass={` ${getInputClasses(
                        "new"
                    )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                    label={'New password'}
                />
                {formik.touched.new && formik.errors.new ? (
                    <div className="text-red-700 text-sm mb-4" >{formik.errors.new}</div>
                ) : null}
                <InputField
                    name={"confirm"}
                    type={"password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirm && formik.errors.confirm}
                    svg={(
                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" /></svg>
                    )}
                    inputClass={`${getInputClasses(
                        "confirm"
                    )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                    label={'Confirm password'}
                />
                {formik.touched.confirm && formik.errors.confirm ? (
                    <div className="text-red-700 text-sm mb-4" >{formik.errors.confirm}</div>
                ) : null}
            </div>
            <div className="flex w-full items-center justify-end mt-10">
                <Button
                    type="submit"
                    loading={accountLoading}
                    childrens={'Update'}
                    classNames={"px-3 py-2 flex justify-center items-center text-white text-sm btn rounded-md "} />

            </div>
        </>
    )
}

export default AccountSetting;
