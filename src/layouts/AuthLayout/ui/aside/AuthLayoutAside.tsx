import classNames from 'classnames';
import { Menu } from 'antd';
import { MenuProps } from 'antd/lib';
import { memo } from 'react';

interface AuthLayoutAsideProps {
    menuItems: MenuProps['items'];
    onClickMenu: MenuProps['onClick'];
    className?: string;
}

export const AuthLayoutAside = memo((props: AuthLayoutAsideProps) => {
    const { className, menuItems, onClickMenu } = props;

    return (
        <aside className={classNames(className)}>
            <div className="siderbarMenu">
                <Menu
                    onClick={onClickMenu}
                    style={{ width: '100%' }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={menuItems}
                />
            </div>
        </aside>
    );
});
