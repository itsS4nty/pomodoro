export const THEME = {
    WorkPhase: {
        background: '#FFF0F0',
        fontColor: '#4D0000', // Very dark red, almost black
        primary: '#FFE6E6', // Lighter pastel red, closer to the background but slightly more saturated
        secondary: '#7A0000', // Dark red, but less dark than the font color
    },
    BreakPhase: {
        background: '#F1F8F1',
        fontColor: '#154D15', // Very dark green, almost black
        primary: '#E5F2E5', // Lighter pastel green, closer to the background but slightly more saturated
        secondary: '#1E7A1E', // Dark green, but less dark than the font color
    },
    LongBreakPhase: {
        background: '#F0FAFF',
        fontColor: '#0D2145', // Very dark blue, almost black
        primary: '#CCEDFF', // Lighter pastel blue, closer to the background but slightly more saturated
        secondary: '#2C5075', // Dark blue, but less dark than the font color
    },
};

export type ThemeType = typeof THEME;

export type ThemePhases = keyof ThemeType;
