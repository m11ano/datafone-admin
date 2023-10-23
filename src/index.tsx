import '@/app/styles/index.less';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';
import App from './app/App';
import { AuthProvider } from './app/providers/AuthProvider';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Invalid root');
}

const root = createRoot(container);

root.render(
    <BrowserRouter basename={__APP_URL_PREFIX__}>
        <StoreProvider>
            <ErrorBoundary>
                <AuthProvider>
                    <ThemeProvider>
                        123
                        <App />
                    </ThemeProvider>
                </AuthProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
