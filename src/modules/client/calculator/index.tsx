import { Link } from 'react-router-dom';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { CalculatorPage } from './pages/CalculatorPage';
import { ModuleParams } from '@/shared/config/modules/types';

const moduleTitle = 'Калькулятор';
const moduleName = 'calculator';

const module: ModuleParams = {
    name: moduleName,
    title: moduleTitle,
    routes: [
        {
            route: {
                path: '/',
                selectedMenu: '1',
                element: <CalculatorPage />,
            },
            children: [
                {
                    route: {
                        path: '/list',
                        breadcrumb: [{ title: 'Список' }],
                        selectedMenu: '1_1',
                        element: (
                            <div>
                                САЙБ <CalculatorPage />
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
            label: moduleTitle,
            icon: <UsergroupAddOutlined />,
            children: [
                {
                    key: '1_1',
                    label: <Link to={`/module/${moduleName}/list`}>Список</Link>,
                },
            ],
        },
    ],
    checkUserRights: [],
};

export default module;
