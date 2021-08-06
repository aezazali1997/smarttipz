import { useEffect, useState } from 'react'
import '../styles/globals.css'
import CustomLayout from '../Layout';

const MyApp = ({ Component, pageProps }) => {

  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    setAuthorized(localStorage.getItem('token'));
  }, [authorized]);

  if (authorized) {
    return (
      <CustomLayout>
        <Component {...pageProps} />
      </CustomLayout>
    )
  }
  else {
    return <Component {...pageProps} />
  }
}

export default MyApp
