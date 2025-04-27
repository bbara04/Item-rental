import { createBrowserRouter } from 'react-router-dom';
import AboutUsPanel from './components/AboutUsPanel';
import LoginPanel from './components/authentication/LoginPanel';
import RegisterPanel from './components/authentication/RegisterPanel';
import ContactPanel from './components/ContactPanel';
import MainPanel from './components/MainPanel';
import ProfilePanel from './components/ProfilePanel';
import AvailableItemsContainer from './components/rentals/AvailableItemsContainer';
import ItemRentalPage from './components/rentals/ItemRentalPage';
import UserRentalsPage from './components/rentals/UserRentalsPage';

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