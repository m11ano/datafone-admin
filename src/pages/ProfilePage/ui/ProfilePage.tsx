import classNames from 'classnames';
import { memo } from 'react';
import cls from './ProfilePage.module.less';

interface ProfilePageProps {
    className?: string;
}

export const ProfilePage = memo((props: ProfilePageProps) => {
    const { className } = props;

    return <div className={classNames(cls.profilePage, [className])}>...</div>;
});
