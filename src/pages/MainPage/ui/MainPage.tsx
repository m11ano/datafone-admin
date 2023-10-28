import classNames from 'classnames';
import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import cls from './MainPage.module.less';
import { useAuth } from '@/app/providers/AuthProvider';

interface MainPageProps {
    className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
    const { className } = props;
    const { authUserData } = useAuth();

    const [counter, setCounter] = useState<number>(0);

    return (
        <div className={classNames(cls.mainPage, [className])}>
            Добро пожаловать в админку! {JSON.stringify(authUserData)}
            <div>{counter}</div>
            <button
                type="button"
                onClick={() => {
                    setCounter((pr) => pr + 1);
                }}
            >
                +
            </button>
            <Link to="/fdfdf">Редактировать профиль</Link>
        </div>
    );
});
