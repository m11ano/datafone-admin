import classNames from 'classnames';
import { memo } from 'react';
import { Menu } from 'antd';
import { MenuProps } from 'antd/lib';
import { Link } from 'react-router-dom';
import moduleConfig from '@core/myProfile/MyProfile';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import cls from './MyProfileMenu.module.less';

interface MyProfileMenuProps {
    className?: string;
    selected: string;
}

const menuItems: MenuProps['items'] = [
    {
        label: <Link to={`/${moduleConfig.name}`}>Мой профиль</Link>,
        key: 'profile',
        icon: <UserOutlined />,
    },
    {
        label: <Link to={`/${moduleConfig.name}/access`}>Доступ к сайту</Link>,
        key: 'access',
        icon: <LockOutlined />,
    },
];

export const MyProfileMenu = memo((props: MyProfileMenuProps) => {
    const { className, selected } = props;

    return (
        <Menu
            className={classNames(cls.myProfileMenu, [className])}
            selectedKeys={[selected]}
            mode="horizontal"
            items={menuItems}
        />
    );
});
