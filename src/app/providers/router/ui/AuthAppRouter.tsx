import { Suspense, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authConfig } from '../config/authConfig';
import { AuthLayout } from '@/layouts/AuthLayout';

const AuthAppRouter = () => (
    <Routes>
        {authConfig.map((route) => (
            <Route
                key={route.path}
                path={route.path}
                element={
                    <Suspense fallback="">
                        <AuthLayout
                            breadcrumb={route.breadcrumb}
                            title={route.title}
                        >
                            {route.element}
                        </AuthLayout>
                    </Suspense>
                }
            />
        ))}
    </Routes>
);
export default memo(AuthAppRouter);
