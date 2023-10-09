import { StoryFn } from '@storybook/react';
import { Theme, ThemeProvider } from '@/app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: StoryFn) => {
    document.documentElement.dataset.theme = theme;

    return (
        <ThemeProvider initialTheme={theme}>
            <div className="app">
                <StoryComponent />
            </div>
        </ThemeProvider>
    );
};
