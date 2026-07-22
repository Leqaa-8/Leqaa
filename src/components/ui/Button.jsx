import { motion } from 'framer-motion'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:opacity-50 disabled:cursor-not-allowed font-arabic'

  const variants = {
    primary: 'bg-gradient-gold text-white shadow-luxury hover:shadow-luxury-lg hover:-translate-y-0.5 active:translate-y-0',
    outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-white hover:shadow-luxury',
    ghost: 'text-warm-brown hover:text-gold hover:bg-beige',
    dark: 'bg-dark text-offwhite hover:bg-dark-soft hover:shadow-luxury-lg hover:-translate-y-0.5',
  }

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  )
}
