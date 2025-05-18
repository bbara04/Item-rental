import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { User } from "./client/types.gen";
import { RegistrationInfo } from "./dto/RegistrationInfo";

type AppContextType = {
    user: User | undefined;
    setUser: Dispatch<SetStateAction<User | undefined>>;
    registrationInfo: RegistrationInfo | undefined;
    setRegistrationInfo: Dispatch<SetStateAction<RegistrationInfo | undefined>>;
    baseColor: string;
};

const AppContext = createContext<AppContextType>({
        user: undefined,
        setUser: () => {},
        registrationInfo: undefined,
        setRegistrationInfo: () => {},  
        baseColor: '#155dfc'
    });

export function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [baseColor, setBaseColor] = useState<string>(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                // Check if parsedUser and its nested properties exist and colorCode is a string
                if (parsedUser && parsedUser.university && typeof parsedUser.university.colorCode === 'string') {
                    return parsedUser.university.colorCode;
                }
            } catch (error) {
                console.error("Error parsing user for baseColor from sessionStorage:", error);
                // Do not remove 'user' item here, let the user state initializer handle it
            }
        }
        return '#155dfc'; // Default color
    });

    const [user, setUser] = useState<User | undefined>(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            try {
                // Removed: setBaseColor(JSON.parse(storedUser).university.colorCode);
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
            // Update baseColor when user changes and is defined
            if (user.university && typeof user.university.colorCode === 'string') {
                setBaseColor(user.university.colorCode);
            } else {
                // If user is defined but colorCode is missing or invalid, revert to default.
                setBaseColor('#155dfc');
            }
        } else {
            sessionStorage.removeItem('user');
            setBaseColor('#155dfc'); // Reset to default color on logout or if user is initially undefined
        }
    }, [user]);

    const AppContextValue: AppContextType = {
        user,
        setUser,
        registrationInfo,
        setRegistrationInfo,
        baseColor
    };

    return <AppContext.Provider value={AppContextValue}>
        {children}
    </AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);