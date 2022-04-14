import { parseCookies } from 'nookies';
import React from 'react';

const Favourites = () => {
  return (
    <div className="w-full h-screen justify-center items-center">
      <p>Favourites</p>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  if (!token)
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login'
      },
      props: {}
    };
  else {
    return { props: {} };
  }
};

export default Favourites;
