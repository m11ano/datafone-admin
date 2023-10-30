import { Link } from 'react-router-dom';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { MyProfilePage } from './pages/MyProfilePage';
import { ModuleParams } from '@/shared/config/modules/types';

const moduleTitle = 'Редактировать профиль';
const moduleName = 'myProfile';

const module: ModuleParams = {
    name: moduleName,
    title: moduleTitle,
    routes: [
        {
            route: {
                path: '/',
                element: <MyProfilePage />,
                selectedMenu: '1',
            },
            children: [
                {
                    route: {
                        path: '/list',
                        breadcrumb: [{ title: 'Список' }],
                        element: (
                            <div>
                                САЙБ <MyProfilePage />
                            </div>
                        ),
                    },
                },
            ],
        },
    ],
    menu: [
        {
            key: '1',
            label: <Link to={`/${moduleName}`}>{moduleTitle}</Link>,
            icon: <UsergroupAddOutlined />,
        },
    ],
};

export default module;
