import classNames from 'classnames';
import { memo } from 'react';
import { MyProfileMenu } from '../../../widgets/MyProfileMenu';
import { EditUserData } from '../../../features/EditUserData';
import cls from './MyProfilePage.module.less';

interface MyProfilePageProps {
    className?: string;
}

export const MyProfilePage = memo((props: MyProfilePageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.myProfilePage, [className])}>
            <MyProfileMenu selected="profile" />
            <EditUserData />
        </div>
    );
});
