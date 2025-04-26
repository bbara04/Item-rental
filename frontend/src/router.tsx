import { createBrowserRouter } from 'react-router-dom';
import AboutUsPanel from './components/AboutUsPanel';
import LoginPanel from './components/authentication/LoginPanel';
import RegisterPanel from './components/authentication/RegisterPanel';
import ContactPanel from './components/ContactPanel';
import AvailableItemsContainer from './components/item/AvailableItemsContainer';
import MainPanel from './components/MainPanel';
import ProfilePanel from './components/ProfilePanel';

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
                    path: "/contact",
                    element: <ContactPanel />
                },
                {
                    path: "/about",
                    element: <AboutUsPanel />
                },
                {
                    path: "/profile", // Add the new route
                    element: <ProfilePanel />
                }
            ]
        }
    ]
);

export default router;