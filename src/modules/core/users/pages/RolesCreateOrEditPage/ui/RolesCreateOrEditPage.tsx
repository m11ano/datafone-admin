import classNames from 'classnames';
import { memo } from 'react';
import { CreateOrEditRole } from '@core/users/features/CreateOrEditRole';
import { useParams } from 'react-router-dom';
import cls from './RolesCreateOrEditPage.module.less';

interface RolesCreateOrEditPageProps {
    className?: string;
}

export const RolesCreateOrEditPage = memo((props: RolesCreateOrEditPageProps) => {
    const { className } = props;

    const { id } = useParams();

    return (
        <div className={classNames(cls.rolesCreateOrEditPage, [className])}>
            <CreateOrEditRole id={id === undefined ? id : Number(id)} />
        </div>
    );
});
