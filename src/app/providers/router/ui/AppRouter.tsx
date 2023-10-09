import { Suspense, memo, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '@/shared/config/routeConfig/routeConfig';

const AppRouter = () => {
    // const isAuth = useSelector(getUserAuthData);

    // const routes = useMemo(
    //     () =>
    //         Object.values(routeConfig).filter((route) => {
    //             if (route.authOnly && !isAuth) {
    //                 return false;
    //             }
    //             return true;
    //         }),
    //     [isAuth],
    // );

    const routes = useMemo(() => Object.values(routeConfig), []);

    return (
        <Routes>
            {routes.map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <Suspense fallback="">
                            <div className="page-wrapper">{element}</div>
                        </Suspense>
                    }
                />
            ))}
        </Routes>
    );
};
export default memo(AppRouter);
