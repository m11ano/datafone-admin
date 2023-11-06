import { ModulesListItem } from '@/shared/config/modules/types';
import { BreadcrumbItem, RouterItem, RouterModuleItem } from '@/shared/config/router/types';

const addModuleRoutes = (
    type: 'core' | 'client',
    result: RouterItem[],
    moduleName: string,
    module: ModulesListItem,
    routes: RouterModuleItem[],
    prevBreadcrumb?: BreadcrumbItem[] | false,
    prevSelectedMenu?: string,
) => {
    routes.forEach((item) => {
        const routeResult: RouterItem = {
            ...item.route,
            path: `/${type === 'client' ? 'module/' : ''}${moduleName}${item.route.path}`,
            breadcrumb:
                item.route.breadcrumb !== false ? [...(prevBreadcrumb || []), ...(item.route.breadcrumb || [])] : false,
        };

        if (item.route.selectedMenu) {
            routeResult.selectedMenu = `${type}_${moduleName}_${item.route.selectedMenu}`;
        } else if (prevSelectedMenu) {
            routeResult.selectedMenu = `${prevSelectedMenu}`;
        }

        result.push(routeResult);

        if (item.children) {
            addModuleRoutes(
                type,
                result,
                moduleName,
                module,
                item.children,
                routeResult.breadcrumb,
                routeResult.selectedMenu,
            );
        }
    });
};

export const buildModuleRoutes = (
    type: 'core' | 'client',
    moduleName: string,
    module: ModulesListItem,
): RouterItem[] => {
    const result: RouterItem[] = [];
    if (module.params.routes) {
        addModuleRoutes(
            type,
            result,
            moduleName,
            module,
            module.params.routes,
            module.params.defaultBreadcrumb || [{ title: module.params.title }],
        );
    }
    return result;
};
