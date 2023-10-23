import { type RouteProps } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { RecoverPasswordPage } from '@/pages/RecoverPasswordPage';

export const notAuthConfig: RouteProps[] = [
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: '/recover-password',
        element: <RecoverPasswordPage />,
    },
    {
        path: '*',
        element: <Navigate to="/" />,
    },
];
