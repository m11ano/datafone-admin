import { ModuleParams } from '@/shared/config/modules/types';
import { MyProfilePage } from './pages/MyProfilePage';
import { MyProfileAccessPage } from './pages/MyProfileAccessPage';

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
