import classNames from 'classnames';
import { memo } from 'react';
import { RolesList } from '@core/users/entities/RolesList';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import moduleConfig from '@core/users/Users';
import cls from './RolesPage.module.less';
import { ButtonsPanel } from '@/shared/ui/ButtonsPanel/ButtonsPanel';

interface RolesPageProps {
    className?: string;
}

export const RolesPage = memo((props: RolesPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.rolesPage, [className])}>
            <ButtonsPanel
                left={
                    <Link to={`/${moduleConfig.name}/roles/new`}>
                        <Button
                            type="primary"
                            size="large"
                        >
                            Создать роль
                        </Button>
                    </Link>
                }
            />
            <RolesList />
        </div>
    );
});
