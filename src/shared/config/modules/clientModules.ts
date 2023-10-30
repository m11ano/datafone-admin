import calculator from '@/modules/client/calculator';
import { ModulesList } from './types';

const modules = [calculator];

const list: ModulesList = {};

modules.forEach((module) => {
    list[module.name] = {
        params: module,
        type: 'client',
    };
});

export default list;
