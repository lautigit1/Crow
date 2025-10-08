// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    // ... tus content
  ],
  theme: {
    extend: {
      colors: {
        // ... tus colores
      },
      boxShadow: { 
        // ... tus sombras
      },
      // ¡AGREGAMOS ESTO!
      animation: {
        gradient: 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
export default config