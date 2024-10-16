/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	container: {
  		center: 'true',
  		padding: '16px'
  	},
  	extend: {
		zIndex: {
			'100': '100',
			'150': '150'
		},
  		colors: {
  			primary: '#14b8a6',
  			dark: '#0f172a',
  			secondary: '#64748b'
  		},
  		screens: {
  			'2xl': '1320px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

