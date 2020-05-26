// Customised Theme for Tailwind CSS
module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./public/**/*.html', './src/**/*.vue'],
  },
  theme: {
    extend: {
      colors: {
        accent: '#42b983',
        'accent-light': '#bee5d2',
      },
    },
  },
};
