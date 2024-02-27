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
    'bg-[#bcaba4]', 'bg-[#f5f5f5]','bg-[#e0e0e0]', 'bg-[#9e9e9e]',

    'text-[#ee9a9a]', 'text-[#ffab91]','text-[#ffcc80]', 'text-[#ffecb2]',
    'text-[#69f0ae]', 'text-[#c5e1a6]','text-[#e5ee9c]', 'text-[#fff59e]',
    'text-[#80cbc6]', 'text-[#81dfeb]','text-[#81d5fa]', 'text-[#64b5f6]',
    'text-[#f590b2]', 'text-[#cd94d9]','text-[#b29edb]', 'text-[#9fa9da]',
    'text-[#bcaba4]', 'text-[#f5f5f5]','text-[#e0e0e0]', 'text-[#9e9e9e]'],
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