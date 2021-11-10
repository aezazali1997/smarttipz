import React from 'react'
import { InputField } from 'src/components';
import { KeySVG } from 'src/assets/SVGs';
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
                        <KeySVG className="w-6 h-6 text-gray-500" />
                    )}
                    inputClass={`${getInputClasses(
                        formik, "old"
                    )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                    label={'Old Password'}
                />
                {formik.touched.old && formik.errors.old &&
                    <div className="text-red-700 text-sm mb-4" >{formik.errors.old}</div>
                }

                <InputField
                    name={"new"}
                    type={"password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.new && formik.errors.new}
                    svg={(
                        <KeySVG className="w-6 h-6 text-gray-500" />
                    )}
                    inputClass={` ${getInputClasses(
                        formik, "new"
                    )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                    label={'New password'}
                />
                {formik.touched.new && formik.errors.new &&
                    <div className="text-red-700 text-sm mb-4" >{formik.errors.new}</div>
                }
                <InputField
                    name={"confirm"}
                    type={"password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirm && formik.errors.confirm}
                    svg={(
                        <KeySVG className="w-6 h-6 text-gray-500" />
                    )}
                    inputClass={`${getInputClasses(
                        formik, "confirm"
                    )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                    label={'Confirm password'}
                />
                {formik.touched.confirm && formik.errors.confirm &&
                    <div className="text-red-700 text-sm mb-4" >{formik.errors.confirm}</div>
                }
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
