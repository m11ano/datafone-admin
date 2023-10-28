import { Suspense, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { notAuthConfig } from '../config/notAuthConfig';
import { NotAuthLayout } from '@/layouts/NotAuthLayout';

const NotAuthAppRouter = () => (
    <Routes>
        {notAuthConfig.map(({ element, path, title }) => (
            <Route
                key={path}
                path={path}
                element={
                    <Suspense fallback="">
                        <NotAuthLayout title={title}>
                            <div>{element}</div>
                        </NotAuthLayout>
                    </Suspense>
                }
            />
        ))}
    </Routes>
);
export default memo(NotAuthAppRouter);
