import { Suspense, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { notAuthConfig } from '@/app/providers/router/config/notAuthConfig';
import { NotAuthLayout } from '@/layouts/NotAuthLayout';

const NotAuthAppRouter = () => (
    <Routes>
        {notAuthConfig.map(({ element, path, title }) => (
            <Route
                key={path}
                path={path}
                element={
                    <NotAuthLayout title={title}>
                        <Suspense fallback="">
                            <div>{element}</div>
                        </Suspense>
                    </NotAuthLayout>
                }
            />
        ))}
    </Routes>
);
export default memo(NotAuthAppRouter);
