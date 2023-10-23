import classNames from 'classnames';
import { memo } from 'react';
import { NotAuthLayout } from '@/layouts/NotAuthLayout';
import { Login } from '@/features/Login';
import cls from './LoginPage.module.less';

interface LoginPageProps {
    className?: string;
}

export const LoginPage = memo((props: LoginPageProps) => {
    const { className } = props;

    return (
        <NotAuthLayout className={classNames([className])}>
            <div className={cls.loginPage}>
                <Login />
            </div>
        </NotAuthLayout>
    );
});
