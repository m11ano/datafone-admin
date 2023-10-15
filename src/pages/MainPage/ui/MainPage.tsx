import classNames from 'classnames';
import { memo } from 'react';
import cls from './MainPage.module.less';
import { useAuth } from '@/app/providers/AuthProvider';

interface MainPageProps {
    className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
    const { className } = props;
    const { user, isLoading } = useAuth();

    return (
        <div className={classNames(cls.mainPage, [className])}>
            Добро пожаловать в админку! {JSON.stringify(user)} {JSON.stringify(isLoading)}
        </div>
    );
});
