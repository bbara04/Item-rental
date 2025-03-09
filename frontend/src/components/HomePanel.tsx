import { useEffect } from "react";
import { User } from "../dto/User";
import NavigationService from "../NavigationService";
import { NavigationBar } from "./NavigationBar";


type HomePanelProps = {
    user: User | undefined;
};

const HomePanel = ({ user }: HomePanelProps) => {
    
    console.log('User:', user);

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

export default HomePanel;