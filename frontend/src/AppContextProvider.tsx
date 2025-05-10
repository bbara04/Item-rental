import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { User } from "./client/types.gen";

type AppContextType = {
    user: User | undefined;
    setUser: Dispatch<SetStateAction<User | undefined>>;
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