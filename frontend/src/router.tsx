import { createBrowserRouter } from 'react-router-dom';
import AdminPanel from './components/admin/AdminPanel';
import AdminDashboardPage from './components/admin/dashboard/AdminDashboardPage';
import ManageItemsPage from './components/admin/items/ManageItemsPage';
import ModifyItemPage from './components/admin/items/ModifyItemPage'; // Import the new component
import RentalApprovalsPage from './components/admin/rentals/RentalApprovalsPage';
import { AdditionalRegistration } from './components/authentication/AdditionalRegistration';
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
            path: "/register/additional",
            element: <AdditionalRegistration />
        },
        {
            path: "/",
            element: <MainPanel />,
            children: [
                {
                    index: true, // Changed from path: "/"
                    element: <AvailableItemsContainer />
                },
                {
                    path: "rent/:itemId", // Removed leading "/"
                    element: <ItemRentalPage />
                },
                {
                    path: "contact", // Removed leading "/"
                    element: <ContactPanel />
                },
                {
                    path: "about", // Removed leading "/"
                    element: <AboutUsPanel />
                },
                {
                    path: "profile", // Removed leading "/"
                    element: <ProfilePanel />
                },
                {
                    path: "my-rentals", // Removed leading "/"
                    element: <UserRentalsPage />
                }
            ]
        },
        {
            path: "/admin",
            element: <AdminPanel />,
            children: [
                {
                    index: true, // Changed from path: "/"
                    element: <AdminDashboardPage />
                },
                {
                    path: "dashboard", // Removed leading "/"
                    element: <AdminDashboardPage />
                },
                {
                    path: "items", // Removed leading "/"
                    element: <ManageItemsPage />
                },
                {
                    path: "items/new", // Route for adding a new item
                    element: <ModifyItemPage />
                },
                {
                    path: "items/edit/:itemId", // Route for editing an existing item
                    element: <ModifyItemPage />
                },
                {
                    path: "approvals", // Removed leading "/"
                    element: <RentalApprovalsPage />
                },
                {
                    path: "profile", // Removed leading "/"
                    element: <ProfilePanel />
                },
                {
                    path: "users", // Removed leading "/"
                    element: <div className="container mx-auto px-4 py-8">
                        <h1 className="text-2xl font-bold">User Management</h1>
                        <p className="text-gray-600 mt-4">User management functionality will be implemented here.</p>
                    </div>
                }
            ]
        }
    ]
);

export default router;