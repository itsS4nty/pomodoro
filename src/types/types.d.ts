import { ThemeType } from '../config/theme/theme-styles';

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}
}
