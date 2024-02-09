/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            workPhase: {
                primary: '#FF5E57', // Red
                secondary: '#FF9500', // Orange
            },
            breakPhase: {
                primary: '#007AFF', // Blue
                secondary: '#34C759', // Green
            },
            longBreak: {
                primary: '#5AC8FA', // Light Blue
                secondary: '#AAF255', // Light Green
            },
            background: {
                primary: '#F2F2F7', // Light Grey
                secondary: '#FFF9EF', // Soft Cream
            },
            accents: {
                primary: '#8E8E93', // Dark Grey
                secondary: '#FFCC00', // Yellow
            },
        },
    },
    plugins: [],
};
