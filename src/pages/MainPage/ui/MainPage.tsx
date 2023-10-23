import classNames from 'classnames';
import { memo } from 'react';
import cls from './MainPage.module.less';
import { useAuth } from '@/app/providers/AuthProvider';
import { AuthLayout } from '@/layouts/AuthLayout';

interface MainPageProps {
    className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
    const { className } = props;
    const { userData } = useAuth();

    return (
        <AuthLayout>
            <div className={classNames(cls.mainPage, [className])}>
                Добро пожаловать в админку! {JSON.stringify(userData)}
            </div>
        </AuthLayout>
    );
});
