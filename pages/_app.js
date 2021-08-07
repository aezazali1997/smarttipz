import { useEffect, useState } from 'react'
import '../styles/globals.css'
import CustomLayout from '../Layout';
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    // if (authorized !== localStorage.getItem('token')) {
    setAuthorized(localStorage.getItem('token'));
    // }
  }, [authorized]);

  const _Logout = () => {
    router.push('/login');
    setAuthorized(localStorage.clear());
  }

  const _Login = (token) => {
    setAuthorized(localStorage.setItem('token', token));
  }

  const state = {
    authorized,
    _Logout
  }

  return (
    <CustomLayout authContext={state}>
      <Component _Login={_Login} {...pageProps} />
    </CustomLayout>
  )
}

export default MyApp
