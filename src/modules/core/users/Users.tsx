import { Link } from 'react-router-dom';
import { UsergroupAddOutlined, UserOutlined, UnlockOutlined } from '@ant-design/icons';
import { ModuleParams } from '@/shared/config/modules/types';

const moduleTitle = 'Пользователи';
const moduleName = 'users';

const moduleConfig: ModuleParams = {
    name: moduleName,
    title: moduleTitle,
    defaultBreadcrumb: [{ title: moduleTitle, link: '' }],
    menu: [
        {
            key: '1',
            label: moduleTitle,
            icon: <UsergroupAddOutlined />,
            children: [
                {
                    key: '1',
                    label: <Link to={`/${moduleName}`}>{moduleTitle}</Link>,
                    icon: <UserOutlined />,
                },
                {
                    key: '2',
                    label: <Link to={`/${moduleName}/roles`}>Роли</Link>,
                    icon: <UnlockOutlined />,
                },
            ],
        },
    ],
};

export default moduleConfig;
