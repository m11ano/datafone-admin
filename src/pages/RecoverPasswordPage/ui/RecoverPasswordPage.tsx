import classNames from 'classnames';
import { memo } from 'react';
import cls from './RecoverPasswordPage.module.less';
import { NotAuthLayout } from '@/layouts/NotAuthLayout/NotAuthLayout';
import { RecoverPassword } from '@/features/RecoverPassword';

interface RecoverPasswordPageProps {
    className?: string;
}

export const RecoverPasswordPage = memo((props: RecoverPasswordPageProps) => {
    const { className } = props;

    return (
        <NotAuthLayout className={classNames([className])}>
            <div className={cls.recoverPasswordPage}>
                <RecoverPassword />
            </div>
        </NotAuthLayout>
    );
});
