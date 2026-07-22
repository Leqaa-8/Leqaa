import { motion } from 'framer-motion'

export default function SectionTitle({ label, title, highlight, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      {label && (
        <span className="inline-block text-primary font-medium text-xs tracking-[0.2em] uppercase mb-3 font-english opacity-80">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-text leading-tight font-arabic">
        {title}{' '}
        {highlight && <span className="text-gradient-gold">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-3.5 text-text-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-arabic font-light">
          {subtitle}
        </p>
      )}
      <div className={`mt-5 flex items-center gap-1.5 ${center ? 'justify-center' : ''}`}>
        <div className="h-px w-14 bg-gradient-to-l from-primary/60 to-transparent rounded-full" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
        <div className="h-px w-6 bg-primary/30 rounded-full" />
      </div>
    </motion.div>
  )
}
