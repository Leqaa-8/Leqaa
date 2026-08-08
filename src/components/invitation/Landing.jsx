import { motion } from 'framer-motion'
import Logo from './Logo'
import WaxSeal from './WaxSeal'
import Particles from './Particles'

// Staggered entrance — each child staggers in from below
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.4,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

function GraduationCapIcon() {
  return (
    <svg
      width="76"
      height="76"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Mortarboard flat top */}
      <path
        d="M40 18L10 32L40 46L70 32L40 18Z"
        stroke="#C8A96A"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Cap body — sides going down */}
      <path
        d="M22 40V56C28 64 52 64 58 56V40"
        stroke="#C8A96A"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tassel cord */}
      <line x1="70" y1="32" x2="70" y2="50" stroke="#C8A96A" strokeWidth="1.4" strokeLinecap="round" />
      {/* Tassel button */}
      <circle cx="70" cy="52" r="2.2" fill="#C8A96A" />
      {/* Tassel threads */}
      <line x1="67.5" y1="54" x2="65" y2="62" stroke="#C8A96A" strokeWidth="1" strokeLinecap="round" />
      <line x1="70" y1="54.5" x2="70" y2="63" stroke="#C8A96A" strokeWidth="1" strokeLinecap="round" />
      <line x1="72.5" y1="54" x2="75" y2="62" stroke="#C8A96A" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

export default function Landing({ onSealClick }) {
  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FDF9F5 0%, #F8F4EF 45%, #F2EAE1 100%)',
      }}
      dir="rtl"
    >
      {/* Floating dust particles — atmospheric */}
      <Particles />

      {/* Subtle vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(180,150,110,0.08) 100%)',
        }}
      />

      {/* Main content stack */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
      >
        {/* LEQAA Logo */}
        <motion.div variants={itemVariants}>
          <Logo />
        </motion.div>

        {/* Gold hair-line divider */}
        <motion.div
          variants={itemVariants}
          className="w-14 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(200,169,106,0.7), transparent)',
          }}
        />

        {/* Graduation cap icon */}
        <motion.div variants={itemVariants}>
          <GraduationCapIcon />
        </motion.div>

        {/* دعوة تخرج */}
        <motion.h1
          variants={itemVariants}
          className="font-kufi font-light tracking-[0.18em]"
          style={{
            fontSize: 'clamp(28px, 6vw, 44px)',
            color: '#2B2B2B',
            lineHeight: 1.35,
          }}
        >
          دعوة تخرج
        </motion.h1>

        {/* Thin decorative line below title */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3"
          style={{ color: '#C8A96A' }}
        >
          <div className="w-8 h-px" style={{ background: 'rgba(200,169,106,0.5)' }} />
          <span className="font-kufi font-light text-xs tracking-[0.22em]" style={{ color: 'rgba(200,169,106,0.8)' }}>
            ✦
          </span>
          <div className="w-8 h-px" style={{ background: 'rgba(200,169,106,0.5)' }} />
        </motion.div>

        {/* Wax seal — the CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-3"
          style={{ filter: 'drop-shadow(0 8px 24px rgba(90,50,0,0.22))' }}
        >
          <WaxSeal onTap={onSealClick} size={95} />
        </motion.div>

        {/* افتح الدعوة + bouncing arrow */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-2 mt-1"
        >
          <span
            className="font-kufi font-light text-xs tracking-[0.24em]"
            style={{ color: 'rgba(200,169,106,0.75)' }}
          >
            افتح الدعوة
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            aria-hidden="true"
            style={{ color: 'rgba(200,169,106,0.7)', fontSize: 18, lineHeight: 1 }}
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
