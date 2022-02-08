import React from 'react'
import { Button, InputField } from 'src/components'

const Index = ({ formik, getInputClasses }) => {
    return (
        <>
            <div className="flex flex-col md:flex-row w-full md:space-x-3">
                <div className="flex flex-col w-full">
                    <InputField
                        name={"ownerName"}
                        type={"text"}
                        value={formik.values.ownerName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.ownerName && formik.errors.ownerName}
                        inputClass={`${getInputClasses(
                            formik, "ownerName"
                        )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                        label={'Name'}
                    />
                    {formik.touched.ownerName && formik.errors.ownerName ? (
                        <div className="text-red-700 text-sm mb-4" >{formik.errors.ownerName}</div>
                    ) : null}

                </div>
                <div className="flex flex-col w-full">
                    <InputField
                        name={"designation"}
                        type={"text"}
                        value={formik.values.designation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.designation && formik.errors.designation}
                        inputClass={`${getInputClasses(
                            formik, "designation"
                        )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                        label={'Occupation/Company'}
                    />
                    {formik.touched.designation && formik.errors.designation ? (
                        <div className="text-red-700 text-sm mb-4" >{formik.errors.designation}</div>
                    ) : null}
                </div>
            </div>
            <div className={`floating-input relative`}>
                <textarea
                    type="text"
                    id="description"
                    rows={3}
                    maxLength={700}
                    name="description"
                    className={`${getInputClasses(
                        formik, "description"
                    )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3`}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="name@example.com"
                    autoComplete="off" />
                <label
                    htmlFor="about"
                    className="absolute top-0 left-0 px-2 py-3 text-sm pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                    Description
                </label>
            </div>
            <div className="flex w-full justify-between">
                {
                    formik.values.description?.length !== 700 ?
                        formik.touched.description && formik.errors.description && (
                            <div className="text-red-700 text-sm mb-4 w-full" >{formik.errors.description}</div>
                        ) :
                        <div className="text-red-700 text-sm mb-4 w-full" >Maximum limit reached</div>

                }
                <p className="flex justify-end text-sm mb-5 w-full">{700 - formik.values.description?.length || 700} / 700</p>
            </div>
        </>
    )
}

export default Index;
