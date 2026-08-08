import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useCurtainAnimation } from '../../hooks/useCurtainAnimation'
import WaxSeal from './WaxSeal'

// Stable golden particles for the reveal background — generated once
function useRevealParticles(count) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        width: 2 + (i % 5) * 0.8,
        left: `${8 + i * (84 / count)}%`,
        top: `${15 + (i % 5) * 16}%`,
        duration: 3.2 + (i % 4) * 0.6,
        delay: (i % 7) * 0.4,
        amplitude: 10 + (i % 3) * 5,
      })),
    [count]
  )
}

// Atmospheric background revealed after curtains part
function RevealBackground() {
  const particles = useRevealParticles(14)

  return (
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(160deg, #FDF5EC 0%, #F8EFE3 45%, #F0E3D0 100%)',
      }}
    >
      {/* Central warm candle glow */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '65vw',
          height: '65vw',
          maxWidth: 520,
          maxHeight: 520,
          background:
            'radial-gradient(circle, rgba(220,175,90,0.22) 0%, rgba(200,169,106,0.1) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(48px)',
        }}
      />

      {/* Blurred burgundy flower — top left */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          top: '12%',
          left: '8%',
          width: 130,
          height: 130,
          background: '#5B0F1A',
          borderRadius: '50%',
          filter: 'blur(38px)',
          opacity: 0.28,
        }}
      />
      {/* Blurred burgundy flower — bottom right */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          bottom: '18%',
          right: '7%',
          width: 100,
          height: 100,
          background: '#7A1525',
          borderRadius: '50%',
          filter: 'blur(30px)',
          opacity: 0.22,
        }}
      />
      {/* Blurred burgundy accent — top right */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          top: '25%',
          right: '12%',
          width: 70,
          height: 90,
          background: '#430914',
          borderRadius: '50%',
          filter: 'blur(25px)',
          opacity: 0.18,
        }}
      />

      {/* Blurred candle glow — warm amber point lights */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          top: '22%',
          right: '22%',
          width: 55,
          height: 70,
          background: 'rgba(255,210,80,0.35)',
          borderRadius: '50%',
          filter: 'blur(22px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          bottom: '28%',
          left: '18%',
          width: 44,
          height: 58,
          background: 'rgba(255,200,70,0.28)',
          borderRadius: '50%',
          filter: 'blur(18px)',
        }}
      />

      {/* Floating golden particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            width: p.width,
            height: p.width,
            left: p.left,
            top: p.top,
            background: '#C8A96A',
          }}
          animate={{
            y: [0, -p.amplitude, 0],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}

      {/* Depth-of-field vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(160,120,80,0.1) 100%)',
        }}
      />
    </div>
  )
}

// Single curtain panel — left or right
function CurtainPanel({ side }) {
  const isLeft = side === 'left'

  // Multiple gradient layers build up realistic velvet depth
  const foldGradient = isLeft
    ? `
      repeating-linear-gradient(
        90deg,
        #250810 0px,
        #340C14 10px,
        #430914 20px,
        #5B0F1A 32px,
        #6E1928 44px,
        #5B0F1A 56px,
        #430914 66px,
        #320B13 76px,
        #250810 82px,
        #1E060F 84px
      )`
    : `
      repeating-linear-gradient(
        90deg,
        #1E060F 0px,
        #250810 2px,
        #320B13 10px,
        #430914 20px,
        #5B0F1A 32px,
        #6E1928 44px,
        #5B0F1A 56px,
        #430914 66px,
        #340C14 76px,
        #250810 84px
      )`

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: `
          /* Top gather / rod shadow */
          linear-gradient(180deg, rgba(0,0,0,0.65) 0%, transparent 12%),
          /* Bottom ground shadow */
          linear-gradient(0deg, rgba(0,0,0,0.45) 0%, transparent 8%),
          /* Inner-edge shadow — where curtains meet */
          ${
            isLeft
              ? 'linear-gradient(90deg, transparent 65%, rgba(0,0,0,0.55) 100%)'
              : 'linear-gradient(270deg, transparent 65%, rgba(0,0,0,0.55) 100%)'
          },
          /* Velvet sheen — warm light from center */
          ${
            isLeft
              ? 'linear-gradient(90deg, rgba(0,0,0,0.25) 0%, rgba(255,180,90,0.055) 45%, rgba(0,0,0,0.1) 100%)'
              : 'linear-gradient(270deg, rgba(0,0,0,0.25) 0%, rgba(255,180,90,0.055) 45%, rgba(0,0,0,0.1) 100%)'
          },
          /* Fabric folds */
          ${foldGradient}
        `,
        willChange: 'transform',
      }}
    >
      {/* Subtle fabric noise via SVG filter — applied to an overlay */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          <filter id={`fabric-noise-${side}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.35"
              numOctaves="4"
              seed="7"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="overlay" result="blend" />
            <feComposite in="blend" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Noise overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: '#5B0F1A',
          opacity: 0.04,
          filter: `url(#fabric-noise-${side})`,
        }}
      />

      {/* Highlight ribbon — simulates light catching the fabric ridge */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0"
        style={{
          [isLeft ? 'left' : 'right']: '28%',
          width: 2,
          background: 'rgba(255,200,100,0.08)',
          filter: 'blur(3px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0"
        style={{
          [isLeft ? 'left' : 'right']: '55%',
          width: 1.5,
          background: 'rgba(255,200,100,0.06)',
          filter: 'blur(2px)',
        }}
      />
    </div>
  )
}

export default function Curtain() {
  const [opened, setOpened] = useState(false)
  const { leftRef, rightRef, sealWrapperRef, openCurtains } = useCurtainAnimation(() =>
    setOpened(true)
  )

  return (
    <div className="relative w-full h-screen overflow-hidden" dir="rtl">
      {/* Atmospheric background — visible once curtains part */}
      <RevealBackground />

      {/* Left curtain panel */}
      <div
        ref={leftRef}
        className="absolute top-0 left-0 h-full"
        style={{ width: '50%', transformOrigin: 'left center' }}
      >
        <CurtainPanel side="left" />
      </div>

      {/* Right curtain panel */}
      <div
        ref={rightRef}
        className="absolute top-0 right-0 h-full"
        style={{ width: '50%', transformOrigin: 'right center' }}
      >
        <CurtainPanel side="right" />
      </div>

      {/* Wax seal holding both curtains — GSAP animates the wrapper */}
      {!opened && (
        <div
          ref={sealWrapperRef}
          className="absolute z-20"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            willChange: 'transform, opacity',
          }}
        >
          <WaxSeal onTap={openCurtains} size={112} />
        </div>
      )}

      {/* Hint text below seal */}
      {!opened && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute z-10 font-kufi font-light text-xs tracking-[0.22em] text-center"
          style={{
            top: 'calc(50% + 74px)',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(200,169,106,0.65)',
          }}
        >
          اضغط لفتح الدعوة
        </motion.p>
      )}
    </div>
  )
}
