import { Suspense, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { notAuthConfig } from '../config/notAuthConfig';
import { NotAuthLayout } from '@/layouts/NotAuthLayout';

const NotAuthAppRouter = () => (
    <Routes>
        {notAuthConfig.map(({ element, path }) => (
            <Route
                key={path}
                path={path}
                element={
                    <Suspense fallback="">
                        <NotAuthLayout>
                            <div>{element}</div>
                        </NotAuthLayout>
                    </Suspense>
                }
            />
        ))}
    </Routes>
);
export default memo(NotAuthAppRouter);
