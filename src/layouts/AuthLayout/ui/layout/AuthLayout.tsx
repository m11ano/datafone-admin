import classNames from 'classnames';
import { ReactNode, useCallback, useEffect } from 'react';
import { MenuProps } from 'antd/lib';
import { UserOutlined, LogoutOutlined, UsergroupAddOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { useAuth } from '@/app/providers/AuthProvider';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AuthLayoutHeader } from '../header/AuthLayoutHeader';
import { AuthLayoutAside } from '../aside/AuthLayoutAside';
import { useDocWidthSize } from '@/shared/lib/hooks/useDocWidthSize/useDocWidthSize';
import { breadcrumb } from '../../model/types/types';

interface AuthLayoutProps {
    className?: string;
    children: ReactNode;
    breadcrumb?: breadcrumb[] | false;
    title?: string | false;
}

type MenuItem = Required<MenuProps>['items'][number];

function getMenuItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const menuItems: MenuProps['items'] = [
    // getItem('Navigation One', 'sub1', <MailOutlined />, [
    //     getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    //     getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    // ]),

    // getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    //     getItem('Option 5', '5'),
    //     getItem('Option 6', '6'),
    //     getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    // ]),

    // { type: 'divider' },

    // getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    //     getItem('Option 9', '9'),
    //     getItem('Option 10', '10'),
    //     getItem('Option 11', '11'),
    //     getItem('Option 12', '12'),
    // ]),

    getMenuItem(
        'Система',
        'system',
        null,
        [getMenuItem('Пользователи', 'system_users', <UsergroupAddOutlined />)],
        'group',
    ),
    { type: 'divider' },
    getMenuItem(
        'Модули',
        'modules',
        null,
        [
            getMenuItem('Калькулятор', 'calculator', <UsergroupAddOutlined />, [
                getMenuItem('Option 3', '3'),
                getMenuItem('Option 4', '4'),
            ]),
        ],
        'group',
    ),
];

export const AuthLayout = (props: AuthLayoutProps) => {
    const { className, children, breadcrumb, title } = props;

    const { logout, authUserData } = useAuth();
    const { theme, toogleTheme } = useTheme();
    const docWidthXlMore = useDocWidthSize('xl', 'more');

    const onThemeSwitcherChange = useCallback(
        (v: boolean) => {
            toogleTheme();
        },
        [toogleTheme],
    );

    const avatarDropDownMenu: MenuProps['items'] = [
        {
            key: '1',
            label: <Link to="/">Редактировать профиль</Link>,
            icon: <UserOutlined />,
        },
        {
            key: '2',
            danger: true,
            label: (
                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }}
                >
                    Выход
                </a>
            ),
            icon: <LogoutOutlined />,
        },
    ];

    const onClickMenu: MenuProps['onClick'] = useCallback((e: any) => {
        console.log('click ', e);
    }, []);

    const mainTitle = 'Панель управления';

    useEffect(() => {
        const titles: string[] = [];
        if (title) {
            titles.push(title);
        } else if (title !== false && breadcrumb) {
            breadcrumb.reverse().forEach((item) => {
                titles.push(item.title);
            });
        }
        titles.push(mainTitle);
        document.title = titles.join(' / ');
    }, [breadcrumb, title]);

    return (
        <div className={classNames('authLayout', [className])}>
            <AuthLayoutHeader
                menuItems={menuItems}
                onClickMenu={onClickMenu}
            />
            <div className="content">
                {docWidthXlMore && (
                    <AuthLayoutAside
                        menuItems={menuItems}
                        onClickMenu={onClickMenu}
                    />
                )}
                <main>
                    <div>
                        {breadcrumb !== false && (
                            <Breadcrumb
                                className="breadcrumb"
                                items={[
                                    {
                                        title: (
                                            <Link to="/">
                                                <HomeOutlined />
                                            </Link>
                                        ),
                                    },
                                    ...(breadcrumb
                                        ? [
                                              ...breadcrumb.map((item) => ({
                                                  title: item.link ? (
                                                      <Link to={item.link}>{item.title}</Link>
                                                  ) : (
                                                      item.title
                                                  ),
                                              })),
                                          ]
                                        : []),
                                ]}
                            />
                        )}
                        <div className="mainContent">{children}</div>
                    </div>
                </main>
            </div>
        </div>
    );
};
