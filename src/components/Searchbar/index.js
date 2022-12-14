import React from 'react'
import { SearchSVG } from 'src/assets/SVGs';

const Searchbar = () => {
    return (
        <div className="sticky top-2 lg:relative lg:top-0 rounded-lg">
            <div className="relative w-full text-gray-600 rounded-lg">
                <input className="border-none bg-white text-black h-10 px-5 pr-10 w-full rounded-lg text-sm focus:outline-none"
                    type="search" name="search" placeholder="Search Messages" />
                <SearchSVG className="w-4 h-4 absolute right-0 top-3  mr-4 pointer-events-none" />
            </div>
        </div>
    )
}

export default Searchbar;
