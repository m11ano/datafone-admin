import classNames from 'classnames';
import { memo } from 'react';
import cls from './MyProfilePage.module.less';

interface MyProfilePageProps {
    className?: string;
}

const MyProfilePage = memo((props: MyProfilePageProps) => {
    const { className } = props;

    return <div className={classNames(cls.myProfilePage, [className])}>Мой профиль тут</div>;
});

export default MyProfilePage;
