import { lazy } from 'react';
import { ModuleParams } from '@/shared/config/modules/types';

const MyProfilePage = lazy(() => import('./pages/MyProfilePage'));
const MyProfileAccessPage = lazy(() => import('./pages/MyProfileAccessPage'));

const routerConfig: ModuleParams['routes'] = [
    {
        route: {
            path: '/',
            element: <MyProfilePage />,
            selectedMenu: '1',
        },
        children: [
            {
                route: {
                    path: '/access',
                    element: <MyProfileAccessPage />,
                    selectedMenu: '2',
                    breadcrumb: [{ title: 'Доступ к сайту' }],
                },
            },
        ],
    },
];

export default routerConfig;
