/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Background
        bg: '#F8F1EA',
        'bg-soft': '#FDF9F5',
        // Card
        card: '#FFFDFC',
        // Primary (muted gold-beige)
        primary: '#B99A7A',
        'primary-dark': '#80644F',
        'primary-light': '#D4BAA0',
        // Text
        text: '#4E3C30',
        'text-muted': '#8F7768',
        // Border
        border: '#E8D8C9',
        'border-dark': '#D4C0AD',
        // Blush accent
        blush: '#F3E4DD',
        'blush-dark': '#E8D2C6',
        // Keep these for backward-compat transitions
        offwhite: '#FDF9F5',
        beige: '#F3E4DD',
        'beige-dark': '#E8D2C6',
        'warm-brown': '#8F7768',
        'warm-brown-dark': '#80644F',
        gold: '#B99A7A',
        'gold-light': '#D4BAA0',
        'gold-dark': '#80644F',
        dark: '#4E3C30',
        'dark-soft': '#5E4A3C',
      },
      fontFamily: {
        arabic: ['Alexandria', 'Tajawal', 'sans-serif'],
        english: ['Poppins', 'sans-serif'],
        sans: ['Alexandria', 'Tajawal', 'Poppins', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        luxury: '0 4px 40px rgba(185, 154, 122, 0.14)',
        'luxury-lg': '0 8px 60px rgba(185, 154, 122, 0.22)',
        card: '0 2px 20px rgba(78, 60, 48, 0.07)',
        'card-hover': '0 8px 40px rgba(78, 60, 48, 0.13)',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(160deg, #FDF9F5 0%, #F8F1EA 50%, #F3E4DD 100%)',
        'gradient-gold': 'linear-gradient(135deg, #B99A7A 0%, #D4BAA0 100%)',
        'gradient-dark': 'linear-gradient(135deg, #4E3C30 0%, #5E4A3C 100%)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
