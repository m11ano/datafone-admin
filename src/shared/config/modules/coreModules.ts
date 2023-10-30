import myProfile from '@/modules/core/myProfile';
import { ModulesList } from './types';

const modules = [myProfile];

const list: ModulesList = {};

modules.forEach((module) => {
    list[module.name] = {
        params: module,
        type: 'core',
    };
});

export default list;
