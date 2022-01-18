/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { createContext, useContext, useMemo, useState } from 'react';

const SearchContext = createContext();

export function AppWrapper({ children }) {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [filterSearch, setFilterSearch] = useState('');
    const [otherUserDetail, setOtherUserDetail] = useState({});
    const [profilePic, setProfilePic] = useState('');

    const _HandleSearchClick = (e) => {
        if (e.keyCode == 13 || e.key == 'Enter') {
            setFilterSearch(search);
            router.push('/search?active=All');
        }
    };

    const data = useMemo(
        () => ({
            search,
            filterSearch,
            otherUserDetail,
            setSearch,
            setOtherUserDetail,
            _HandleSearchClick,
            profilePic,
            setProfilePic
        }),
        [search, setSearch, otherUserDetail, setOtherUserDetail, _HandleSearchClick, profilePic,
            setProfilePic]
    );

    return <SearchContext.Provider value={data}>{children}</SearchContext.Provider>;
}

export const useSearchContext = () => {
    return useContext(SearchContext);
};
