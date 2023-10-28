import { type RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const authConfig: RouteProps[] = [
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];
