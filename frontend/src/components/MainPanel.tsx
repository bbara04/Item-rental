import { NavigationBar } from "./NavigationBar";
import { useAppContext } from "../AppContextProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";


const MainPanel = () => {

    const { user } = useAppContext()
    const navigate = useNavigate();

    useEffect(()=>{
        if (!user) {
            navigate('/login')
        }
    }, [user]);

    return (
        <div>
            <NavigationBar></NavigationBar>
            <Outlet/>
        </div>
    );
};

export default MainPanel;
