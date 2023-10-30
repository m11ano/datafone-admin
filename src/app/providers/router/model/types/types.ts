import { ModulesListItem } from '@/shared/config/modules/types';
import { RouterItem } from '@/shared/config/router/types';

export interface AuthConfigListSimpleItem {
    type: 'simple';
    routes: RouterItem[];
}

export interface AuthConfigListModuleItem {
    type: 'module';
    routes: RouterItem[];
    module: ModulesListItem;
}

export type AuthConfigListItem = AuthConfigListSimpleItem | AuthConfigListModuleItem;
