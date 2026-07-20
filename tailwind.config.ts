import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        'light-white': '#F4F4F4',
        'dark-black': '#1E1E1E',
        'gray-light': '#E5E5E5',
        'dark-grey': '#2A2A2A',
        'light-blue': '#338287',
        'dark-blue': '#32C0C9',
        'status-red': '#fd4b4b',
        'status-green': '#26ca57',
      },
      fontFamily: {
        main: ['"Montserrat"', 'sans-serif'],
        header: ['"Montserrat Alternates"', 'sans-serif'],
        topHeader: ['"Russo One"', 'sans-serif'],
        menu: ['"Montserrat Subrayada"', 'sans-serif'],
        code: ['"Share Tech Mono"', 'monospace'],
        notFound: ['"Inconsolata"', 'sans-serif'],
      },
      fontWeight: {
        regular: '400',
        semiBold: '700',
        bold: '900',
      },
      fontSize: {
        xxl: '12rem',
      },
      screens: {
        mobile: '760px',
        tablet: '820px',
        desktop: '1024px',
      },
    },
  },
}
export default config
