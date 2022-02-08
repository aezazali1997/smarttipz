import { useEffect, useState } from 'react'
import '../../styles/globals.css';
import 'tailwindcss/tailwind.css';

import { parseCookies } from 'nookies';
import CustomLayout from 'src/Layout';
import { AppWrapper } from 'src/contexts';
import Head from 'next/head';

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
          {/* Add the favicon */}
          <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
          </Head>
          {/* Add the favicon */}
          <Component {...pageProps} />
        </CustomLayout>
      </AppWrapper>
    )
  }
  return (
    <AppWrapper>
      {/* Add the favicon */}
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      {/* Add the favicon */}
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp;
