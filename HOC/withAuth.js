/* eslint-disable react/display-name */
import { useRouter } from "next/router";
const withAuth = (WrappedComponent) => {
    return (props) => {
        // checks whether we are on client / browser or server.
        if (typeof window !== "undefined") {
            const router = useRouter();
            const { asPath } = useRouter();

            const accessToken = localStorage.getItem("token");

            // If there is no access token we redirect to "/" page.
            if (!accessToken && (asPath === '/login' || asPath === '/' || asPath === '/forgot-password' || asPath === '/authenticate')) {
                return router.replace(asPath);
            }
            else if (accessToken && (asPath === '/login' || asPath === '/' || asPath === '/forgot-password' || asPath === '/authenticate')) {
                return router.push('/profile');
            }

            // If this is an accessToken we just render the component that was passed with all its props

            return <WrappedComponent {...props} />;
        }

        // If we are on server, return null
        return null;
    };
};

export default withAuth;
