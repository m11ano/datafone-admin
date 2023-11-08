import classNames from 'classnames';
import { memo } from 'react';
import { MyProfileMenu } from '../../../widgets/MyProfileMenu';
import cls from './MyProfileAccessPage.module.less';
import { EditUserAccess } from '../../../features/EditUserAccess';

interface MyProfileAccessPageProps {
    className?: string;
}

export const MyProfileAccessPage = memo((props: MyProfileAccessPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.myProfileAccessPage, [className])}>
            <MyProfileMenu selected="access" />
            <EditUserAccess />
        </div>
    );
});
