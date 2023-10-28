import classNames from 'classnames';
import { memo } from 'react';
import Title from 'antd/es/typography/Title';
import cls from './MainPage.module.less';

interface MainPageProps {
    className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.mainPage, [className])}>
            <Title level={4}>Добро пожаловать в админку!</Title>
        </div>
    );
});
