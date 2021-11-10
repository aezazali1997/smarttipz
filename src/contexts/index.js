import { createContext, useContext, useMemo, useState } from 'react';

const SocketContext = createContext();


export function AppWrapper({ children }) {

    const [socket, setSocket] = useState(null);

    const data = useMemo(() => ({ socket, setSocket }), [socket, setSocket]);

    return (
        <SocketContext.Provider value={data}>
            {children}
        </SocketContext.Provider>
    );
}

export function useAppContext() {
    return useContext(SocketContext);
}
