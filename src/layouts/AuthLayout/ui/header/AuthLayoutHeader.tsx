import { memo, useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import Icon, { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Avatar, Drawer, Dropdown, Menu, MenuProps, Space, Switch } from 'antd';
import { useAuth } from '@/app/providers/AuthProvider';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import ImgIcon from '@/shared/assets/icons/ImgIcon';
import SunPng from '@/shared/assets/icons/files/icon-sun-40x40.png';
import MoonPng from '@/shared/assets/icons/files/icon-moon-40x40.png';
import { useDocWidthSize } from '@/shared/lib/hooks/useDocWidthSize/useDocWidthSize';

interface AuthLayoutHeaderProps {
    menuItems: MenuProps['items'];
    onClickMenu: MenuProps['onClick'];
    className?: string;
}

export const AuthLayoutHeader = memo((props: AuthLayoutHeaderProps) => {
    const { className, menuItems, onClickMenu } = props;

    const { logout, authUserData } = useAuth();
    const { theme, toogleTheme } = useTheme();
    const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
    const docWidthXlMore = useDocWidthSize('xl', 'more');

    const onMenuDrawerClose = () => {
        setOpenMenuDrawer(false);
    };

    const onClickMenuWrapped = useCallback(
        (e: any) => {
            onClickMenu?.(e);
            setOpenMenuDrawer(false);
        },
        [onClickMenu],
    );

    const onThemeSwitcherChange = useCallback(
        (v: boolean) => {
            toogleTheme();
        },
        [toogleTheme],
    );

    const avatarDropDownMenu: MenuProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: <Link to="/profile">Редактировать профиль</Link>,
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
        ],
        [logout],
    );

    return (
        <header className={classNames(className)}>
            <div>
                <div className="menu">
                    {!docWidthXlMore && (
                        <span
                            onClick={() => {
                                setOpenMenuDrawer(true);
                            }}
                        >
                            Меню
                        </span>
                    )}
                    <Drawer
                        title="Меню"
                        placement="left"
                        onClose={onMenuDrawerClose}
                        open={openMenuDrawer}
                        destroyOnClose
                    >
                        <Menu
                            onClick={onClickMenuWrapped}
                            style={{ width: '100%' }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            items={menuItems}
                        />
                    </Drawer>
                </div>
                <div className="logo">
                    <Link to="/">Datafone.ru</Link>
                </div>
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
    );
});
