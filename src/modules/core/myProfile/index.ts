import { ModuleParams } from '@/shared/config/modules/types';
import moduleConfig from './MyProfile';
import routerConfig from './routerConfig';

const moduleParams: ModuleParams = {
    routes: routerConfig,
    ...moduleConfig,
};

export default moduleParams;
