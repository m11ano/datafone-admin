import classNames from 'classnames';
import { memo } from 'react';
import { MyProfileMenu } from '@core/myProfile/widgets/MyProfileMenu';
import { EditUserData } from '@core/myProfile/features/EditUserData';
import cls from './MyProfilePage.module.less';

interface MyProfilePageProps {
    className?: string;
}

const MyProfilePage = memo((props: MyProfilePageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.myProfilePage, [className])}>
            <MyProfileMenu selected="profile" />
            <EditUserData />
        </div>
    );
});

export default MyProfilePage;
