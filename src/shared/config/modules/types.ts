import { BreadcrumbItem, RouterModuleItem } from '@/shared/config/router/types';

export interface MenuItem {
    label: React.ReactNode;
    key: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
    type?: 'group' | 'divider';
}

export interface ModuleParams {
    name: string;
    title: string;
    routes?: RouterModuleItem[];
    defaultBreadcrumb?: BreadcrumbItem[];
    checkUserRights?: string[];
    menu?: MenuItem[];
}
export interface ModulesListItem {
    params: ModuleParams;
    type: 'core' | 'client';
}

export interface ModulesList {
    [k: string]: ModulesListItem;
}
