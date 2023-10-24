import classNames from 'classnames';
import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert } from 'antd';
import { NotAuthLayout } from '@/layouts/NotAuthLayout';
import { Login } from '@/features/Login';
import cls from './LoginPage.module.less';

interface LoginPageProps {
    className?: string;
}

export const LoginPage = memo((props: LoginPageProps) => {
    const { className } = props;

    const [query] = useSearchParams();

    return (
        <NotAuthLayout className={classNames([className])}>
            <div className={cls.loginPage}>
                {query.get('new_password_generated') !== null && (
                    <Alert
                        message="Новый пароль отправлен на ваш e-mail"
                        type="warning"
                        showIcon
                        className={cls.alert}
                    />
                )}
                <Login />
            </div>
        </NotAuthLayout>
    );
});
