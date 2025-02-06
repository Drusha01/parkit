import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.jsx',
        './resources/**/*.vue',
    ],
    darkMode: "media",
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'main-color': 'rgba(6, 40, 61,1)',
                'navigation-color':'rgb(79 70 229)',
                'active-navigation-color':'rgb(67 56 202)'
              },
        },
    },
    plugins: [
        require('flowbite/plugin'),
        require('daisyui'),
      ],
};
