import React, { useMemo, useState, ReactNode, useEffect } from 'react';
import { ConfigProvider, theme as themeAntd } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

const defaultTheme = Object.values(Theme).includes(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme)
    ? (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme)
    : Theme.LIGHT;

interface ThemeProdiverProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProdiverProps) => {
    const { initialTheme, children } = props;

    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            <ConfigProvider
                locale={ruRU}
                theme={{
                    // algorithm: themeAntd.darkAlgorithm,
                    algorithm: theme === Theme.DARK ? themeAntd.darkAlgorithm : themeAntd.defaultAlgorithm,
                    // token: {
                    //     // Seed Token
                    //     colorPrimary: '#00b96b',
                    //     borderRadius: 5,

                    //     // Alias Token
                    //     colorBgContainer: '#f6ffed',
                    // },
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
