import { useRouter } from "next/router";
import { createContext, useContext, useState } from 'react';

const SocketContext = createContext();

export function AppWrapper({ children }) {
    const router = useRouter();

    const data = {
        name: "Muhammad Suleman",
        Designation: 'Software Developer'
    }

    return (
        <SocketContext.Provider value={data}>
            {children}
        </SocketContext.Provider>
    );
}

export function useAppContext() {
    return useContext(SocketContext);
}
