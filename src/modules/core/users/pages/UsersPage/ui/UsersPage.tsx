import classNames from 'classnames';
import { memo } from 'react';

import cls from './UsersPage.module.less';

interface UsersPageProps {
    className?: string;
}

export const UsersPage = memo((props: UsersPageProps) => {
    const { className } = props;

    return <div className={classNames(cls.usersPage, [className])}>Юзеры</div>;
});
