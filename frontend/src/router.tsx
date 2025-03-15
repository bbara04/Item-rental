import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainPanel from './components/MainPanel';
import LoginPanel from './components/authentication/LoginPanel';
import RegisterPanel from './components/authentication/RegisterPanel';
import { AvailableItems } from './components/renting/AvailableItems';

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
            element: <Navigate to="/rent" replace />
        },
        {
            path: "/rent",
            element: <MainPanel />,
            children: [
                {
                    path: "/rent",
                    element: <AvailableItems />
                }
            ]
        }
    ]
);

export default router;