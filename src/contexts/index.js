/* eslint-disable react-hooks/exhaustive-deps */
import router, { useRouter } from 'next/router';
import { createContext, useContext, useMemo, useState } from 'react';

const SearchContext = createContext();


export function AppWrapper({ children }) {

    const router = useRouter();
    const [search, setSearch] = useState('');
    const [filterSearch, setFilterSearch] = useState('');

    const _HandleSearchClick = (e) => {
        if (e.keyCode == 13 || e.key == "Enter") {
            setFilterSearch(search);
            router.push('/search?All');
        }
    }

    const data = useMemo(() => ({ search, filterSearch, setSearch, _HandleSearchClick }), [search, setSearch, _HandleSearchClick])

    return (
        <SearchContext.Provider value={data}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearchContext = () => {
    return useContext(SearchContext);
}
