import classNames from 'classnames';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { CreateOrEditUser } from '@core/users/features/CreateOrEditUser';
import cls from './UsersCreateOrEditPage.module.less';

interface UsersCreateOrEditPageProps {
    className?: string;
}

export const UsersCreateOrEditPage = memo((props: UsersCreateOrEditPageProps) => {
    const { className } = props;

    const { id } = useParams();

    return (
        <div className={classNames(cls.usersCreateOrEditPage, [className])}>
            <CreateOrEditUser id={id === undefined ? id : Number(id)} />
        </div>
    );
});
