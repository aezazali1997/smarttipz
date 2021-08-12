import React from 'react'

const Searchbar = () => {
    return (
        <div className="pt-2 relative w-full text-gray-600">
            <input className="border-none bg-white text-black h-10 px-5 pr-10 w-full rounded-lg text-sm focus:outline-none"
                type="search" name="search" placeholder="Search Messages" />
            <svg className="w-4 h-4 absolute right-0 top-0 mt-5 mr-4 pointer-events-none" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
        </div>
    )
}

export default Searchbar;
