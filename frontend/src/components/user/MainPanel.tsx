import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContextProvider";
import { NavigationBar } from "../NavigationBar";


const MainPanel = () => {

    const { user, setUser } = useAppContext()
    const navigate = useNavigate();

    // TODO: Remove this hack and implement proper authentication
    useEffect(()=>{
        if (!user) {
            const storedUser = sessionStorage.getItem('user')
            if (storedUser) {
                setUser(JSON.parse(storedUser));             
            } else {
                navigate('/login')
            }
        } else {
            sessionStorage.setItem('user', JSON.stringify(user));
        }
    }, []);

    return (
        <div>
            <NavigationBar></NavigationBar>
            <Outlet/>
        </div>
    );
};

export default MainPanel;
