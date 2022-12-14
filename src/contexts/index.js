/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

const SearchContext = createContext();

export function AppWrapper({ children }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterSearch, setFilterSearch] = useState('');
  const [otherUserDetail, setOtherUserDetail] = useState({});
  const [profilePic, setProfilePic] = useState('');

  const _HandleSearchClick = (e) => {
    
      localStorage.setItem('searchText', search);
      setSearch(search);
      setFilterSearch(search);
      if (!router.asPath.includes('?')) {
        router.push('/search?active=All', undefined, { shallow: true });
      }
    
  };
  useEffect(() => {
    if (!router.asPath.includes('search')) {
      setSearch('');
    }
  }, [router.asPath]);
  /*  useEffect(() => {
        const searchText = localStorage.getItem('searchText');
        const otherUserDetails = JSON.parse(localStorage.getItem('profile'));
        if (otherUserDetails) {
            setOtherUserDetail(otherUserDetails);
        }
        if (searchText) {
            setSearch(searchText);
            setFilterSearch(searchText);
        }
      
    }, [otherUserDetail]); */

  const data = useMemo(
    () => ({
      search,
      filterSearch,
      otherUserDetail,
      setSearch,
      setOtherUserDetail,
      _HandleSearchClick,
      profilePic,
      setFilterSearch,
      setProfilePic
    }),

    [
      search,
      setSearch,
      otherUserDetail,
      setOtherUserDetail,
      _HandleSearchClick,
      profilePic,
      filterSearch,
      setProfilePic,
      setFilterSearch
    ]
  );

  return <SearchContext.Provider value={data}>{children}</SearchContext.Provider>;
}

export const useSearchContext = () => {
    return useContext(SearchContext);
};
