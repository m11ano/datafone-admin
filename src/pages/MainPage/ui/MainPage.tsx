import classNames from 'classnames';
import { memo } from 'react';
import cls from './MainPage.module.less';

interface MainPageProps {
    className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
    const { className } = props;

    return <div className={classNames(cls.mainPage, [className])}>Добро пожаловать в админку!</div>;
});
