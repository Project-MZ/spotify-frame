import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'spotify-green': '#1ed760',
        'spotify-black': '#121212',
      },
    },
  },
  plugins: [],
};

export default config;
