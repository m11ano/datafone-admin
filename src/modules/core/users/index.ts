import { ModuleParams } from '@/shared/config/modules/types';
import { usersModuleConfig } from './usersModuleConfig';
import { usersRouterConfig } from './usersRouterConfig';

const moduleParams: ModuleParams = {
    routes: usersRouterConfig,
    ...usersModuleConfig,
};

export default moduleParams;
