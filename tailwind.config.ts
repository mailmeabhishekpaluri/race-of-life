import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3191C2',
          yellow: '#F5C518',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        body: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
