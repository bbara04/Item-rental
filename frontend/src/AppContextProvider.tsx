import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { User } from "./client/types.gen";
import { RegistrationInfo } from "./dto/RegistrationInfo";

type AppContextType = {
    user: User | undefined;
    setUser: Dispatch<SetStateAction<User | undefined>>;
    registrationInfo: RegistrationInfo | undefined;
    setRegistrationInfo: Dispatch<SetStateAction<RegistrationInfo | undefined>>;
};

const AppContext = createContext<AppContextType>({
        user: undefined,
        setUser: () => {},
        registrationInfo: undefined,
        setRegistrationInfo: () => {}  
    });

export function AppContextProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | undefined>(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            try {
                return JSON.parse(storedUser) as User;
            } catch (error) {
                console.error("Error parsing user from sessionStorage:", error);
                sessionStorage.removeItem('user'); // Clear invalid data
                return undefined;
            }
        }
        return undefined;
    });
    const [registrationInfo, setRegistrationInfo] = useState<RegistrationInfo | undefined>(undefined);

    useEffect(() => {
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('user');
        }
    }, [user]);

    const AppContextValue: AppContextType = {
        user,
        setUser,
        registrationInfo,
        setRegistrationInfo
    };

    return <AppContext.Provider value={AppContextValue}>
        {children}
    </AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);