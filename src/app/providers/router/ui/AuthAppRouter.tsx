import { Suspense, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authConfig } from '../config/authConfig';

const AuthAppRouter = () => (
    <Routes>
        {authConfig.map(({ element, path }) => (
            <Route
                key={path}
                path={path}
                element={<Suspense fallback="">{element}</Suspense>}
            />
        ))}
    </Routes>
);
export default memo(AuthAppRouter);
