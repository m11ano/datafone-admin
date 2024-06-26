import { lazy } from 'react';
import { ModuleParams } from '@/shared/config/modules/types';

const UsersPage = lazy(() => import('./pages/UsersPage'));
const RolesPage = lazy(() => import('./pages/RolesPage'));
const RolesCreateOrEditPage = lazy(() => import('./pages/RolesCreateOrEditPage'));
const UsersCreateOrEditPage = lazy(() => import('./pages/UsersCreateOrEditPage'));

const usersRouterConfig: ModuleParams['routes'] = [
    {
        route: {
            path: '/',
            element: <UsersPage />,
            selectedMenu: '1_1',
        },
        children: [
            {
                route: {
                    path: '/new',
                    element: <UsersCreateOrEditPage />,
                    selectedMenu: '1_1',
                    breadcrumb: [{ title: 'Создать пользователя' }],
                },
            },
            {
                route: {
                    path: '/edit/:id',
                    element: <UsersCreateOrEditPage />,
                    selectedMenu: '1_1',
                    breadcrumb: [{ title: 'Редактировать пользователя' }],
                },
            },
            {
                route: {
                    path: '/roles',
                    element: <RolesPage />,
                    selectedMenu: '1_2',
                    breadcrumb: [{ link: '/roles', title: 'Роли' }],
                },
                children: [
                    {
                        route: {
                            path: '/roles/new',
                            element: <RolesCreateOrEditPage />,
                            selectedMenu: '1_2',
                            breadcrumb: [{ title: 'Создать роль' }],
                        },
                    },
                    {
                        route: {
                            path: '/roles/edit/:id',
                            element: <RolesCreateOrEditPage />,
                            selectedMenu: '1_2',
                            breadcrumb: [{ title: 'Редактировать роль' }],
                        },
                    },
                ],
            },
        ],
    },
];

export { usersRouterConfig };
