import { Link } from 'react-router-dom';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { ModuleParams } from '@/shared/config/modules/types';

const moduleTitle = 'Редактировать профиль';
const moduleName = 'myProfile';

const moduleConfig: ModuleParams = {
    name: moduleName,
    title: moduleTitle,
    defaultBreadcrumb: [{ title: moduleTitle, link: `/${moduleName}` }],
    menu: [
        {
            key: '1',
            label: <Link to={`/${moduleName}`}>{moduleTitle}</Link>,
            icon: <UsergroupAddOutlined />,
        },
    ],
};

export default moduleConfig;
