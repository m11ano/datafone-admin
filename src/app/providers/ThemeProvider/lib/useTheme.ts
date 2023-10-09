import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface useThemeResult {
    toogleTheme: () => void;
    theme: Theme;
}

export function useTheme(): useThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toogleTheme = () => {
        // const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        let newTheme: Theme = Theme.LIGHT;
        if (theme === Theme.DARK) {
            newTheme = Theme.LIGHT;
        } else if (theme === Theme.LIGHT) {
            newTheme = Theme.ORANGE;
        } else if (theme === Theme.ORANGE) {
            newTheme = Theme.DARK;
        }
        setTheme?.(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme: theme || Theme.LIGHT,
        toogleTheme,
    };
}
