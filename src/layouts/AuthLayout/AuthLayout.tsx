import classNames from 'classnames';
import { ReactNode, useCallback } from 'react';
import { Avatar, Dropdown, Space, Switch } from 'antd';
import { MenuProps } from 'antd/lib';
import Icon, { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import ImgIcon from '@/shared/assets/icons/ImgIcon';
import MoonPng from '@/shared/assets/icons/files/icon-moon-40x40.png';
import SunPng from '@/shared/assets/icons/files/icon-sun-40x40.png';

interface AuthLayoutProps {
    className?: string;
    children: ReactNode;
}

export const AuthLayout = (props: AuthLayoutProps) => {
    const { className, children } = props;

    const { logout, authUserData } = useAuth();
    const { theme, toogleTheme } = useTheme();

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

    return (
        <div className={classNames('authLayout', [className])}>
            <header>
                <div>
                    <div className="logo">Datafone.ru</div>
                    {authUserData?.rights['core::access_to_admin_core_settings'] === true && (
                        <div className="menu">Управление пользователями</div>
                    )}
                    <div className="userData">
                        <Space size="middle">
                            <div className="hello">Привет, {authUserData?.user.firstName}!</div>
                            <div>
                                <Dropdown
                                    placement="bottomRight"
                                    arrow={{ pointAtCenter: true }}
                                    menu={{
                                        items: avatarDropDownMenu,
                                    }}
                                >
                                    <Link to="/">
                                        <Avatar style={{ backgroundColor: 'var(--bg-active-second-color)' }}>
                                            {authUserData?.user.firstName.slice(0, 1)}
                                        </Avatar>
                                    </Link>
                                </Dropdown>
                            </div>
                            <div className="themeSwitcher">
                                <Switch
                                    checkedChildren={
                                        <Icon component={ImgIcon(SunPng, 20, 20, { position: 'relative', top: 1 })} />
                                    }
                                    unCheckedChildren={
                                        <Icon component={ImgIcon(MoonPng, 16, 16, { position: 'relative', top: -2 })} />
                                    }
                                    defaultChecked={theme !== Theme.DARK}
                                    onChange={onThemeSwitcherChange}
                                />
                            </div>
                        </Space>
                    </div>
                </div>
            </header>
            {children}
        </div>
    );
};
