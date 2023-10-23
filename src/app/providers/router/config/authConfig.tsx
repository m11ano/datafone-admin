import { type RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';

export const authConfig: RouteProps[] = [
    {
        path: '/',
        element: <MainPage />,
    },
];
