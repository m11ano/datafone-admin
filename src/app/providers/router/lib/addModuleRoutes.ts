import { ModulesListItem } from '@/shared/config/modules/types';
import { BreadcrumbItem, RouterItem, RouterModuleItem } from '@/shared/config/router/types';

const prepareBreadcrumb = (type: 'core' | 'client', moduleName: string, breadcrumb?: BreadcrumbItem[] | false) =>
    breadcrumb && [
        ...breadcrumb.map((br) => ({
            ...br,
            link: br.link !== undefined ? `${type === 'client' ? '/module/' : '/'}${moduleName}${br.link}` : br.link,
        })),
    ];

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
        const breadcrumb = prepareBreadcrumb(type, moduleName, item.route.breadcrumb);
        const routeResult: RouterItem = {
            ...item.route,
            path: `/${type === 'client' ? 'module/' : ''}${moduleName}${item.route.path}`,
            breadcrumb: breadcrumb !== false ? [...(prevBreadcrumb || []), ...(breadcrumb || [])] : false,
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
            prepareBreadcrumb(type, moduleName, module.params.defaultBreadcrumb || [{ title: module.params.title }]),
        );
    }
    return result;
};
