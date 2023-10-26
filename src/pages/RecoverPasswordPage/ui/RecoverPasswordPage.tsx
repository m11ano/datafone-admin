import classNames from 'classnames';
import { memo } from 'react';
import cls from './RecoverPasswordPage.module.less';
import { RecoverPassword } from '@/features/RecoverPassword';

interface RecoverPasswordPageProps {
    className?: string;
}

export const RecoverPasswordPage = memo((props: RecoverPasswordPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.recoverPasswordPage, className)}>
            <RecoverPassword />
        </div>
    );
});
