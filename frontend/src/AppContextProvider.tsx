import { createContext, useContext, useState } from "react";
import { User } from "./dto/User";

type AppContextType = {
    user: User | undefined;
    setUser: (user: User) => void;
};

const AppContext = createContext<AppContextType>({ user: undefined, setUser: () => {} });

export function AppContextProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | undefined>(undefined);

    const AppContextValue: AppContextType = {
        user,
        setUser,
    };

    return <AppContext.Provider value={AppContextValue}>
        {children}
    </AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);