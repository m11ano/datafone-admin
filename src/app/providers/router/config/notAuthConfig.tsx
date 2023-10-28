import { type RouteProps } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { RecoverPasswordPage } from '@/pages/RecoverPasswordPage';

type routerItem = RouteProps & { title?: string };

export const notAuthConfig: routerItem[] = [
    {
        path: '/',
        element: <LoginPage />,
        title: 'Вход',
    },
    {
        path: '/recover-password',
        element: <RecoverPasswordPage />,
        title: 'Восстановление пароля',
    },
    {
        path: '*',
        element: <Navigate to="/" />,
    },
];
