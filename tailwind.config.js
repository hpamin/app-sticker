module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: {
                    500: '#3F51B5',
                },
                secondary: {
                    500: '#26A69A',
                },
                tertiary: {
                    500: '#FF8A65',
                },
                background: '#FFFFFF',
                surface: '#F5F5F5',
                text: '#212121',
                error: '#F44336',
            },
        },
    },
    plugins: [],
};
