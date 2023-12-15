import classNames from 'classnames';
import { memo } from 'react';

import { usersModuleConfig } from '@core/users/usersModuleConfig';
import { FileAddOutlined } from '@ant-design/icons';
import { UsersList } from '@core/users/entities/UsersList';
import cls from './UsersPage.module.less';
import { ButtonsPanel } from '@/shared/ui/ButtonsPanel/ButtonsPanel';
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink';

interface UsersPageProps {
    className?: string;
}

export const UsersPage = memo((props: UsersPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.usersPage, [className])}>
            <ButtonsPanel
                left={
                    <ButtonLink
                        as="button"
                        linkTo={`/${usersModuleConfig.name}/new`}
                        type="primary"
                        size="large"
                        icon={<FileAddOutlined />}
                    >
                        Создать пользователя
                    </ButtonLink>
                }
            />
            <UsersList />
        </div>
    );
});
