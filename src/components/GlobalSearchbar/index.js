import React from 'react'
import { SearchSVG } from 'src/assets/SVGs';
import { useSearchContext } from 'src/contexts';

const GlobalSearchbar = () => {
    const { search, setSearch, _HandleSearchClick } = useSearchContext();

    return (
        <div className="rounded-lg">
            <div className="w-full text-gray-600 rounded-lg">
                <input className="globalSearch border-none bg-white text-black h-10 px-5 pr-10 w-full rounded-lg text-sm focus:outline-none"
                    type="text"
                    name="search"
                    placeholder="&#61442; Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyUp={(e) => _HandleSearchClick(e)}
                />
                {/* <SearchSVG className="w-4 h-4 absolute right-0 top-3 font-bold  mr-4 pointer-events-none" /> */}
            </div>
        </div>
    )
}

export default GlobalSearchbar;
