import React from 'react'
import { parseCookies } from 'nookies'

const Home = () => {
  return (
    <div>

    </div>
  )
}

export const getServerSideProps = async (context) => {
  const cookie = parseCookies(context);
  if (cookie.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard/profile",
      },
      props: {},
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/auth/login",
    },
    props: {},
  };
}

export default Home;
