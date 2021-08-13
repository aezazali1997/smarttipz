import { useEffect, useState } from 'react'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { useRouter } from 'next/router';
import CustomLayout from '../Layout';
import { parseCookies } from 'nookies';
import { io } from 'socket.io-client';

const MyApp = ({ Component, pageProps }) => {
  const [authorized, setAuthorized] = useState(null)
  const URL = "https://smart-tipz-chat.herokuapp.com";
  const socket = io(URL, { autoConnect: false });

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
