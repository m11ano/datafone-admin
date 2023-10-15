import { type RouteProps } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';

export const notAuthConfig: RouteProps[] = [
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: '*',
        element: <Navigate to="/" />,
    },
];
