import { Button, InputField } from 'components'
import React from 'react'

const Index = ({ formik, getInputClasses, loading }) => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col md:flex-row w-full md:space-x-3">
                <div className="flex flex-col w-full">
                    <InputField
                        name={"name"}
                        type={"text"}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && formik.errors.name}
                        inputClass={`${getInputClasses(
                            formik, "name"
                        )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                        label={'Name'}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-700 text-sm mb-4" >{formik.errors.name}</div>
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
                        label={'Designation'}
                    />
                    {formik.touched.designation && formik.errors.designation ? (
                        <div className="text-red-700 text-sm mb-4" >{formik.errors.designation}</div>
                    ) : null}
                </div>
            </div>
            <div className={`floating-input ${formik.touched.description && formik.errors.description ? "mb-1" : "mb-5"} relative`}>
                <textarea
                    type="text"
                    id="description"
                    rows={3}
                    maxLength={150}
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
                    className="absolute top-0 left-0 px-2 py-3 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                    Description
                </label>
            </div>
            {formik.touched.description && formik.errors.description ? (
                <div className="text-red-700 text-sm mb-4" >{formik.errors.description}</div>
            ) : null}
            <div>
                <Button
                    type={"submit"}
                    classNames={"flex  justify-center btn text-white p-3 rounded-md"}
                    childrens={'Add Testimonial'}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default Index;
