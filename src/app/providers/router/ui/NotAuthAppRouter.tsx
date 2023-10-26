import { Suspense, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { notAuthConfig } from '../config/notAuthConfig';

const NotAuthAppRouter = () => (
    <Routes>
        {notAuthConfig.map(({ element, path }) => (
            <Route
                key={path}
                path={path}
                element={
                    <Suspense fallback="">
                        <div>{element}</div>
                    </Suspense>
                }
            />
        ))}
    </Routes>
);
export default memo(NotAuthAppRouter);
