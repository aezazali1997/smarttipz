import { useEffect, useState } from 'react'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import CustomLayout from '../Layout';
import { parseCookies } from 'nookies';

const MyApp = ({ Component, pageProps }) => {
  const [authorized, setAuthorized] = useState(null)

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies?.token || null;
    setAuthorized(token)
  })

  if (authorized) {
    return (
      <CustomLayout>
        <Component {...pageProps} />
      </CustomLayout>
    )
  }
  return (
    <Component {...pageProps} />)
}

export default MyApp;
