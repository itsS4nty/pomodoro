import { useState } from 'react';
import { ThemeContext, ThemeProvider } from 'styled-components';
import { THEME } from './theme-styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ThemeContextProvider = ({ children }: { children: any }) => {
    const [_theme] = useState(THEME);

    return (
        <ThemeContext.Provider value={_theme}>
            <ThemeProvider theme={_theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
