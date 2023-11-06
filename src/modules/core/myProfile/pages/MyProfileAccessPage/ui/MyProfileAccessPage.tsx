import classNames from 'classnames';
import { memo } from 'react';
import { MyProfileMenu } from '@core/myProfile/widgets/MyProfileMenu';
import cls from './MyProfileAccessPage.module.less';

interface MyProfileAccessPageProps {
    className?: string;
}

const MyProfileAccessPage = memo((props: MyProfileAccessPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.myProfileAccessPage, [className])}>
            <MyProfileMenu selected="access" />
            Доступ к сайту
        </div>
    );
});

export default MyProfileAccessPage;
