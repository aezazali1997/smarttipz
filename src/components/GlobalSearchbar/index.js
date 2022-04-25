import React from 'react'
import { SearchSVG, CroseIcon } from 'src/assets/SVGs';
import { useSearchContext } from 'src/contexts';

const GlobalSearchbar = () => {
  const { search, setSearch, _HandleSearchClick } = useSearchContext();

  return (
    <div className="w-full text-gray-600 rounded-lg relative">
      <input
        className="border-none bg-white text-black h-10 px-5 pr-10 w-full rounded-lg text-sm focus:outline-none"
        type="text"
        name="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        // onKeyUp={(e) => _HandleSearchClick(e)}
        onKeyDown={(e) => {
          if (e.key == 'Enter') {
            _HandleSearchClick(search);
          }
        }}
      />

      {search.length > 0 ? (
        <button
          onClick={() => {
            setSearch('');
          }}
          className=" absolute right-10 top-3">
          <CroseIcon className={`w-4 h-4 color-app`} />
        </button>
      ) : null}
      <button
        onClick={() => {
          _HandleSearchClick(search);
        }}
        className={`${
          search.length > 0 ? ' btn rounded-md cursor-pointer ' : ' cursor-default '
        }w-6 h-6 absolute right-2 top-2`}>
        <SearchSVG className={`w-4 h-4 ml-1 ${search.length > 0 ? 'custom-classes' : 'text-gray-500'}`} />
      </button>

      {/* <SearchSVG className="w-4 h-4 absolute right-0 top-3 font-bold  mr-4 pointer-events-none" /> */}
    </div>
  );
};

export default GlobalSearchbar;
