import { useEffect } from "react";
import { User } from "../dto/User";
import NavigationService from "../NavigationService";


type HomePanelProps = {
    user: User | null;
};

const HomePanel = ({ user }: HomePanelProps) => {
    
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
            <h1>Home Panel</h1>
            <p>Logged in as: {user.userName}</p>
            <p>Welcome {user.firstName} {user.lastName}!</p>
            <p>Email address: {user.email}</p>
        </div>
    );
};

export default HomePanel;