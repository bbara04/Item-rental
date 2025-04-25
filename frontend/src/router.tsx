import { createBrowserRouter } from 'react-router-dom';
import AboutUsPanel from './components/AboutUsPanel';
import ContactPanel from './components/ContactPanel';
import MainPanel from './components/MainPanel';
import LoginPanel from './components/authentication/LoginPanel';
import RegisterPanel from './components/authentication/RegisterPanel';
import AvailableItemsContainer from './components/item/AvailableItemsContainer';

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
                }
            ]
        }
    ]
);

export default router;