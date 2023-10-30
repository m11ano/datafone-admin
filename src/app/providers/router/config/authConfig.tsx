import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import coreModules from '@/shared/config/modules/coreModules';
import clientModules from '@/shared/config/modules/clientModules';
import { buildModuleRoutes } from '../lib/addModuleRoutes';
import { AuthConfigListItem } from '../model/types/types';

const authConfig: AuthConfigListItem[] = [
    {
        type: 'simple',
        routes: [
            {
                path: '/',
                element: <MainPage />,
                breadcrumb: [{ title: 'Панель управления' }],
                title: false,
            },
        ],
    },
];

Object.entries(coreModules).forEach(([moduleName, module]) => {
    const moduleRoutes = buildModuleRoutes('core', moduleName, module);
    authConfig.push({
        type: 'module',
        routes: moduleRoutes,
        module,
    });
});

Object.entries(clientModules).forEach(([moduleName, module]) => {
    const moduleRoutes = buildModuleRoutes('client', moduleName, module);
    authConfig.push({
        type: 'module',
        routes: moduleRoutes,
        module,
    });
});

authConfig.push({
    type: 'simple',
    routes: [
        {
            path: '*',
            element: <NotFoundPage />,
            breadcrumb: false,
            title: 'Страница не найдена',
        },
    ],
});

export { authConfig };
