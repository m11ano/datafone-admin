import classNames from 'classnames';
import { ReactNode } from 'react';
import cls from './AuthLayout.module.less';
import { useAuth } from '@/app/providers/AuthProvider';

interface AuthLayoutProps {
    className?: string;
    children: ReactNode;
}

export const AuthLayout = (props: AuthLayoutProps) => {
    const { className, children } = props;

    const { logout } = useAuth();

    return (
        <div className={classNames(cls.authLayout, [className])}>
            <header>
                Привет! <button onClick={logout}>Выход</button>
            </header>
            {children}
        </div>
    );
};
