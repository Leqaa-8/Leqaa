import { useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

const DOTS = Array.from({ length: 28 }, (_, i) => {
  const angle = (i / 28) * Math.PI * 2 - Math.PI / 2
  return {
    x: 50 + 43 * Math.cos(angle),
    y: 50 + 43 * Math.sin(angle),
  }
})

export default function WaxSeal({ onTap, size = 95 }) {
  const controls = useAnimation()
  const [shining, setShining] = useState(false)
  const tapping = useRef(false)

  const handleClick = async () => {
    if (tapping.current) return
    tapping.current = true
    setShining(true)

    // Vibration micro-animation — tactile wax-seal feel
    await controls.start({
      x: [0, -4, 4, -3, 3, -1.5, 1.5, 0],
      transition: { duration: 0.38, ease: 'easeInOut' },
    })

    setShining(false)
    tapping.current = false
    if (onTap) onTap()
  }

  return (
    <motion.button
      aria-label="افتح الدعوة"
      className="relative cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-inv-gold/60 rounded-full"
      style={{ width: size, height: size }}
      animate={controls}
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <defs>
          {/* Matte gold radial gradient */}
          <radialGradient id="seal-gold" cx="38%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#F0D68A" />
            <stop offset="30%" stopColor="#D4AE60" />
            <stop offset="60%" stopColor="#B08830" />
            <stop offset="100%" stopColor="#8A6518" />
          </radialGradient>

          {/* Inner embossed gradient — slightly recessed */}
          <radialGradient id="seal-inner" cx="42%" cy="36%" r="65%">
            <stop offset="0%" stopColor="#DDB855" />
            <stop offset="55%" stopColor="#A07828" />
            <stop offset="100%" stopColor="#7A5515" />
          </radialGradient>

          {/* Rim highlight */}
          <radialGradient id="seal-rim" cx="35%" cy="28%" r="70%">
            <stop offset="0%" stopColor="rgba(255,230,120,0.5)" />
            <stop offset="100%" stopColor="rgba(255,230,120,0)" />
          </radialGradient>

          {/* Realistic drop shadow */}
          <filter id="seal-drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="rgba(60,30,0,0.55)" />
          </filter>
        </defs>

        {/* Shadow layer */}
        <circle cx="50" cy="52" r="46" fill="rgba(60,30,0,0.18)" filter="url(#seal-drop-shadow)" />

        {/* Main seal body */}
        <circle cx="50" cy="50" r="46" fill="url(#seal-gold)" />

        {/* Rim highlight */}
        <circle cx="50" cy="50" r="46" fill="url(#seal-rim)" />

        {/* Outer decorative ring */}
        <circle cx="50" cy="50" r="43.5" fill="none" stroke="rgba(255,235,140,0.35)" strokeWidth="1" />
        <circle cx="50" cy="50" r="40.5" fill="none" stroke="rgba(255,235,140,0.2)" strokeWidth="0.5" />

        {/* Decorative dot ring */}
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="0.9" fill="rgba(255,240,160,0.45)" />
        ))}

        {/* Inner embossed disc */}
        <circle cx="50" cy="50" r="34" fill="url(#seal-inner)" />

        {/* Inner ring */}
        <circle cx="50" cy="50" r="31.5" fill="none" stroke="rgba(255,230,120,0.25)" strokeWidth="0.8" />

        {/* Embossed text — LEQAA Arabic لقاء */}
        <text
          x="50"
          y="47"
          textAnchor="middle"
          fill="rgba(255,248,195,0.88)"
          fontSize="10"
          fontFamily="Poppins, sans-serif"
          fontWeight="700"
          letterSpacing="3"
          style={{ userSelect: 'none' }}
        >
          LEQAA
        </text>
        <text
          x="50"
          y="60"
          textAnchor="middle"
          fill="rgba(255,245,185,0.75)"
          fontSize="9"
          fontFamily="Noto Kufi Arabic, Alexandria, sans-serif"
          fontWeight="400"
          letterSpacing="1.5"
          style={{ userSelect: 'none' }}
        >
          لقاء
        </text>

        {/* Top & bottom ornamental lines */}
        <line x1="34" y1="38" x2="66" y2="38" stroke="rgba(255,235,140,0.3)" strokeWidth="0.6" />
        <line x1="34" y1="63" x2="66" y2="63" stroke="rgba(255,235,140,0.3)" strokeWidth="0.6" />

        {/* Matte surface — subtle highlight at top-left */}
        <ellipse cx="33" cy="28" rx="14" ry="9" fill="rgba(255,250,200,0.07)" />
      </svg>

      {/* Shine sweep — only during tap */}
      {shining && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ x: '-100%', skewX: -20 }}
            animate={{ x: '160%' }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
            style={{
              width: '55%',
              background:
                'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.55) 50%, transparent 80%)',
            }}
          />
        </motion.div>
      )}
    </motion.button>
  )
}
