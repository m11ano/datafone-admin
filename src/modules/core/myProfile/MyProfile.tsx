import { ModuleParams } from '@/shared/config/modules/types';

const moduleTitle = 'Редактировать профиль';
const moduleName = 'myProfile';

const moduleConfig: ModuleParams = {
    name: moduleName,
    title: moduleTitle,
    defaultBreadcrumb: [{ title: moduleTitle, link: `/${moduleName}` }],
};

export default moduleConfig;
