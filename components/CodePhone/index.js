import React from 'react'
import PhoneInput from 'react-phone-input-2';

const CountrySelector = ({ value, onChange }) => {

    return (
        <PhoneInput
            country={'us'}
            placeholder="Enter phone number"
            value={value}
            className="border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm px-2 py-3 h-12"
            onChange={onChange} />
    )
}

export default CountrySelector;