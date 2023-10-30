import classNames from 'classnames';
import { Menu } from 'antd';
import { memo } from 'react';
import { MenuItem } from '@/shared/config/modules/types';

interface AuthLayoutAsideProps {
    menuItems: MenuItem[];
    className?: string;
    selectedMenu?: string;
}

export const AuthLayoutAside = memo((props: AuthLayoutAsideProps) => {
    const { className, menuItems, selectedMenu } = props;

    return (
        <aside className={classNames(className)}>
            <div className="siderbarMenu">
                <Menu
                    style={{ width: '100%' }}
                    selectedKeys={selectedMenu ? [selectedMenu] : []}
                    mode="inline"
                    items={menuItems}
                />
            </div>
        </aside>
    );
});
