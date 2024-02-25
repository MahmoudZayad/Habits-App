import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-[#ee9a9a]', 'bg-[#ffab91]','bg-[#ffcc80]', 'bg-[#ffecb2]',
    'bg-[#69f0ae]', 'bg-[#c5e1a6]','bg-[#e5ee9c]', 'bg-[#fff59e]',
    'bg-[#80cbc6]', 'bg-[#81dfeb]','bg-[#81d5fa]', 'bg-[#64b5f6]',
    'bg-[#f590b2]', 'bg-[#cd94d9]','bg-[#b29edb]', 'bg-[#9fa9da]',
    'bg-[#bcaba4]', 'bg-[#f5f5f5]','bg-[#e0e0e0]', 'bg-[#9e9e9e]'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config