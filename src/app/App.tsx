import { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AuthAppRouter, NotAuthAppRouter } from './providers/router';
import { useAuth } from './providers/AuthProvider';
import { FullPageLoader } from '@/shared/ui/FullPageLoader/FullPageLoader';
import { AuthLayout } from '@/layouts/AuthLayout';
import { NotAuthLayout } from '@/layouts/NotAuthLayout';

const App = () => {
    const { theme } = useTheme();

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(userActions.initAuthData());
    // }, [dispatch]);

    // useEffect(() => {
    //     document.documentElement.dataset.theme = theme;
    // }, [theme]);

    const { authUserData, isLoading } = useAuth();

    if (isLoading) {
        return <FullPageLoader />;
    }

    return (
        <div className={classNames('app')}>
            <Suspense fallback="">
                {authUserData === null ? (
                    <NotAuthLayout>
                        <NotAuthAppRouter />
                    </NotAuthLayout>
                ) : (
                    <AuthLayout>
                        <AuthAppRouter />
                    </AuthLayout>
                )}
            </Suspense>
        </div>
    );
};

export default App;
