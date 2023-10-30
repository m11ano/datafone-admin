import { Suspense, memo, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authConfig } from '@/app/providers/router/config/authConfig';
import { AuthLayout } from '@/layouts/AuthLayout';
import { RouterItem } from '@/shared/config/router/types';
import { useAuth } from '@/app/providers/AuthProvider';
import { checkModuleUserRights } from '@/shared/config/modules/lib/checkModuleUserRights';
import { Loader } from '@/shared/ui/Loader/Loader';

const AuthAppRouter = () => {
    const { authUserData } = useAuth();
    const routes: RouterItem[] = useMemo(() => {
        let result: RouterItem[] = [];
        authConfig.forEach((item) => {
            if (item.type === 'module' && authUserData !== null) {
                const rightsCheck = checkModuleUserRights(authUserData, item.module);
                if (rightsCheck === false) {
                    return;
                }
            }
            result = [...result, ...item.routes];
        });
        return result;
    }, [authUserData]);

    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <AuthLayout
                            breadcrumb={route.breadcrumb}
                            title={route.title}
                            selectedMenu={route.selectedMenu}
                        >
                            <Suspense
                                fallback={
                                    <div style={{ textAlign: 'center' }}>
                                        <Loader />
                                    </div>
                                }
                            >
                                {route.element}
                            </Suspense>
                        </AuthLayout>
                    }
                />
            ))}
        </Routes>
    );
};
export default memo(AuthAppRouter);
