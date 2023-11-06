import { memo, useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import Icon, { UserOutlined, LogoutOutlined, ExclamationCircleFilled, MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Avatar, Drawer, Dropdown, Menu, MenuProps, Modal, Space, Switch } from 'antd';
import { useAuth } from '@/app/providers/AuthProvider';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import ImgIcon from '@/shared/assets/icons/ImgIcon';
import SunPng from '@/shared/assets/icons/files/icon-sun-40x40.png';
import MoonPng from '@/shared/assets/icons/files/icon-moon-40x40.png';
import { useDocWidthSize } from '@/shared/lib/hooks/useDocWidthSize/useDocWidthSize';
import { MenuItem } from '@/shared/config/modules/types';

interface AuthLayoutHeaderProps {
    menuItems: MenuItem[];
    className?: string;
    selectedMenu?: string;
}

export const AuthLayoutHeader = memo((props: AuthLayoutHeaderProps) => {
    const { className, menuItems, selectedMenu } = props;

    const { logout, authUserData } = useAuth();
    const { theme, toogleTheme } = useTheme();
    const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
    const [openAvatarDropdown, setOpenAvatarDropdown] = useState(false);
    const docWidthXlMore = useDocWidthSize('xl', 'more');

    const onMenuDrawerClose = () => {
        setOpenMenuDrawer(false);
    };

    const onClickMenuWrapped = useCallback((e: any) => {
        setOpenMenuDrawer(false);
    }, []);

    const onThemeSwitcherChange = useCallback(
        (v: boolean) => {
            toogleTheme();
        },
        [toogleTheme],
    );

    const [modal, contextHolder] = Modal.useModal();

    const avatarDropDownMenu: MenuProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: (
                    <Link
                        to="/myProfile"
                        onClick={() => {
                            setTimeout(() => {
                                setOpenAvatarDropdown(false);
                            }, 0);
                        }}
                    >
                        Редактировать профиль
                    </Link>
                ),
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
                            setOpenAvatarDropdown(false);
                            modal.confirm({
                                title: 'Вы действительно хотите выйти?',
                                icon: <ExclamationCircleFilled />,
                                onOk() {
                                    logout();
                                },
                            });
                        }}
                    >
                        Выход
                    </a>
                ),
                icon: <LogoutOutlined />,
            },
        ],
        [logout, modal],
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
                            <MenuOutlined
                                alt="Меню"
                                className="icon"
                            />
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
                            selectedKeys={selectedMenu ? [selectedMenu] : []}
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
                        <div className="avatarBlock">
                            <Dropdown
                                placement="bottomRight"
                                onOpenChange={setOpenAvatarDropdown}
                                open={openAvatarDropdown}
                                menu={{
                                    items: avatarDropDownMenu,
                                }}
                            >
                                <span className="avatarWrapper">
                                    <Avatar
                                        className="avatar"
                                        src={authUserData?.user.avatarThumb100 && authUserData?.user.avatarThumb100.way}
                                    >
                                        {authUserData?.user.firstName.slice(0, 1)}
                                    </Avatar>
                                </span>
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
            {contextHolder}
        </header>
    );
});
