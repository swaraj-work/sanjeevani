/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "./app/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#8B5A2B",       // warm brown
                secondary: "#4B6F44",     // forest green
                accent: "#D4A017",        // saffron gold
                neutral: {
                    50: "#fcfaf5",
                    100: "#f5f0e5",
                    200: "#e6dfd0",
                    800: "#3c3a36",
                    900: "#22201c"
                }
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
            screens: {
                'xs': '475px',
                // Standard Tailwind breakpoints
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
            },
            spacing: {
                '18': '4.5rem',
                '72': '18rem',
                '84': '21rem',
                '96': '24rem',
            },
            boxShadow: {
                'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
                'medium': '0 6px 30px rgba(0, 0, 0, 0.1)',
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '2rem',
                    lg: '4rem',
                    xl: '5rem',
                    '2xl': '6rem',
                },
            },
        },
    },
    plugins: [],
};
