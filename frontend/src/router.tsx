import { createBrowserRouter } from 'react-router-dom';
import LoginPanel from './components/authentication/LoginPanel';
import RegisterPanel from './components/authentication/RegisterPanel';
import AboutUsPanel from './components/user/AboutUsPanel';
import ContactPanel from './components/user/ContactPanel';
import MainPanel from './components/user/MainPanel';
import ProfilePanel from './components/user/ProfilePanel';
import AvailableItemsContainer from './components/user/rentals/AvailableItemsContainer';
import ItemRentalPage from './components/user/rentals/ItemRentalPage';
import UserRentalsPage from './components/user/rentals/UserRentalsPage';

const router = createBrowserRouter(
    [
        {
            path: "/login",
            element: <LoginPanel />
        },
        {
            path: "/register",
            element: <RegisterPanel />
        },
        {
            path: "/",
            element: <MainPanel />,
            children: [
                {
                    path: "/",
                    element: <AvailableItemsContainer />
                },
                {
                    path: "/rent/:itemId",
                    element: <ItemRentalPage />
                },
                {
                    path: "/contact",
                    element: <ContactPanel />
                },
                {
                    path: "/about",
                    element: <AboutUsPanel />
                },
                {
                    path: "/profile",
                    element: <ProfilePanel />
                },
                {
                    path: "/my-rentals",
                    element: <UserRentalsPage />
                }
            ]
        }
    ]
);

export default router;