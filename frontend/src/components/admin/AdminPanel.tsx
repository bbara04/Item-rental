import { Outlet } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";

const AdminPanel = () => {
    // const { user, setUser } = useAppContext();
    // const navigate = useNavigate();

    // // Authentication check with admin role verification
    // useEffect(() => {
    //     if (!user) {
    //         const storedUser = sessionStorage.getItem('user');
    //         if (storedUser) {
    //             const parsedUser = JSON.parse(storedUser);
    //             // Check if user has admin role (assuming there's a role property)
    //             if (parsedUser.role === 'ADMIN') {
    //                 setUser(parsedUser);
    //             } else {
    //                 // Redirect non-admin users to regular home page
    //                 navigate('/');
    //             }
    //         } else {
    //             navigate('/login');
    //         }
    //     } else {
    //         // Check current user's role
    //         if (user.role !== 'ADMIN') {
    //             navigate('/');
    //         } else {
    //             sessionStorage.setItem('user', JSON.stringify(user));
    //         }
    //     }
    // }, []);

    return (
        <div>
            <NavigationBar />
            <Outlet />
        </div>
    );
};

export default AdminPanel;