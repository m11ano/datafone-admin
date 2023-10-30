import { lazy } from 'react';

// const MyProfilePage = lazy(() => import('./ui/MyProfilePage'));

const MyProfilePage = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
            setTimeout(() => resolve(import('./ui/MyProfilePage')), 3500);
        }),
);

export { MyProfilePage };
