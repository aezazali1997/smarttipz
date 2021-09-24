
import React from 'react'

const Index = ({ checked, onChange, name }) => {
    return (
        <div className="relative inline-block w-10 mr-2 self-center select-none transition duration-200 ease-in">
            <input
                checked={checked}
                onChange={onChange}
                type="checkbox"
                name={name}
                id={name}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
            <label htmlFor="showName" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
    )
}

export default Index;

