import { Suspense, memo, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { notAuthConfig } from '../config/notAuthConfig';
import { FullPageLoader } from '@/shared/ui/FullPageLoader/FullPageLoader';
import { authConfig } from '../config/authConfig';

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

    const { authUserData, isLoading } = useAuth();

    const routes = useMemo(() => (authUserData === null ? notAuthConfig : authConfig), [authUserData]);

    if (isLoading) {
        return <FullPageLoader />;
    }

    return (
        <Routes>
            {routes.map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <div>
                            {authUserData === null ? (
                                <Suspense fallback="">
                                    <div>{element}</div>
                                </Suspense>
                            ) : (
                                <Suspense fallback="">
                                    <div className="page-wrapper">{element}</div>
                                </Suspense>
                            )}
                        </div>
                    }
                />
            ))}
        </Routes>
    );
};
export default memo(AppRouter);
