import { useEffect, useState } from 'react'
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

import { parseCookies } from 'nookies';
import CustomLayout from 'Layout';
import { AppWrapper } from 'contexts';


const MyApp = ({ Component, pageProps }) => {
  const [authorized, setAuthorized] = useState(null)

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies?.token || null;
    setAuthorized(token)
  })

  if (authorized) {
    return (
      <AppWrapper>
        <CustomLayout>
          <Component {...pageProps} />
        </CustomLayout>
      </AppWrapper>
    )
  }
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp;
