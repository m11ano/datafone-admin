import { RouteProps } from 'react-router-dom';

export type BreadcrumbItem = {
    title: string;
    link?: string;
};

export type RouterItem = RouteProps & {
    breadcrumb?: BreadcrumbItem[] | false;
    title?: string | false;
    selectedMenu?: string;
};

export type RouterModuleItem = {
    route: RouterItem;
    children?: RouterModuleItem[];
};
