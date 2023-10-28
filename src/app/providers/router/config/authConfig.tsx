import { type RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { breadcrumb } from '@/layouts/AuthLayout';
import { ProfilePage } from '@/pages/ProfilePage';

type routerItem = RouteProps & { breadcrumb?: breadcrumb[] | false } & { title?: string | false };

export const authConfig: routerItem[] = [
    {
        path: '/',
        element: <MainPage />,
        breadcrumb: [{ title: 'Панель управления' }],
        title: false,
    },
    {
        path: '/profile',
        element: <ProfilePage />,
        breadcrumb: [{ title: 'Мой профиль' }],
    },
    {
        path: '*',
        element: <NotFoundPage />,
        breadcrumb: false,
        title: 'Страница не найдена',
    },
];
