import { parseCookies } from 'nookies';
import React from 'react';

const Dashboard = () => {
  return <div></div>;
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
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard/news-feed'
      },
      props: {}
    };
  }
};

export default Dashboard;
