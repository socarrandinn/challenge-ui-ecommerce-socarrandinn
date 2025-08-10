
const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        'card-secondary': 'var(--card-secondary)',
        'orange-light': 'var(--orange-light)',
        'orange': 'var(--orange)',
        'card-orange': 'var(--card-orange)',
      },
      transitionProperty: {
        background: 'background-color, background',
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
