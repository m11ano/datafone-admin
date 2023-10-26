import { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AppRouter } from './providers/router';

const App = () => {
    const { theme } = useTheme();

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(userActions.initAuthData());
    // }, [dispatch]);

    // useEffect(() => {
    //     document.documentElement.dataset.theme = theme;
    // }, [theme]);

    return (
        <div className={classNames('app', {})}>
            <Suspense fallback="">
                <AppRouter />
            </Suspense>
        </div>
    );
};

export default App;
