import { useRouter } from "next/router";
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AppWrapper({ children }) {
    const router = useRouter();

    const [authorized, setAuthorized] = useState(null);

    let _Logout = () => {
        setAuthorized(localStorage.clear());
        router.push('/login');
    }

    const values = {
        _Logout,
        authorized
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AuthContext);
}
