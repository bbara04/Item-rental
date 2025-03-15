import { useEffect } from "react";
import NavigationService from "../NavigationService";
import { NavigationBar } from "./NavigationBar";
import { useAppContext } from "../AppContextProvider";


const MainPanel = () => {

    const { user } = useAppContext()

    useEffect(() => {
        if (!user) {
            NavigationService.goToLogin();
        }
    });

    if (!user) {
        return <div>
            <h1>Home Panel</h1>
            <p>Not logged in</p>
        </div>;
    }

    return (
        <div>
            <NavigationBar></NavigationBar>
            <p>Logged in as: {user.userName}</p>
            <p>Welcome {user.firstName} {user.lastName}!</p>
            <p>Email address: {user.email}</p>
        </div>
    );
};

export default MainPanel;