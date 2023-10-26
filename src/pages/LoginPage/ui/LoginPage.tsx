import classNames from 'classnames';
import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert } from 'antd';
import { Login } from '@/features/Login';
import cls from './LoginPage.module.less';

interface LoginPageProps {
    className?: string;
}

export const LoginPage = memo((props: LoginPageProps) => {
    const { className } = props;

    const [query] = useSearchParams();

    return (
        <div className={classNames(cls.loginPage, className)}>
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
    );
});
