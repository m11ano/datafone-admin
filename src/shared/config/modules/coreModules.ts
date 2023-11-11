import myProfile from '@/modules/core/myProfile';
import users from '@/modules/core/users';

import { ModulesList } from './types';

const modules = [myProfile, users];

const list: ModulesList = {};

modules.forEach((module) => {
    list[module.name] = {
        params: module,
        type: 'core',
    };
});

export default list;
