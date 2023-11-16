import classNames from 'classnames';
import { memo } from 'react';
import { RolesList } from '@core/users/entities/RolesList';
import { usersModuleConfig } from '@core/users/users';
import { FileAddOutlined } from '@ant-design/icons';
import cls from './RolesPage.module.less';
import { ButtonsPanel } from '@/shared/ui/ButtonsPanel/ButtonsPanel';
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink';

interface RolesPageProps {
    className?: string;
}

export const RolesPage = memo((props: RolesPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.rolesPage, [className])}>
            <ButtonsPanel
                left={
                    <ButtonLink
                        as="button"
                        linkTo={`/${usersModuleConfig.name}/roles/new`}
                        type="primary"
                        size="large"
                        icon={<FileAddOutlined />}
                    >
                        Создать роль
                    </ButtonLink>
                }
            />
            <RolesList />
        </div>
    );
});
