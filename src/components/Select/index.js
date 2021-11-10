import React from 'react'

const Select = ({ classNames, value, name, id, handleChange, data }) => {
    return (
        <select
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            className={classNames}>
            {
                data.map(({ value, label }, index) => (
                    <option
                        key={index}
                        value={value}
                    >
                        {label}
                    </option>
                ))
            }
        </select>
    )
}

export default Select;