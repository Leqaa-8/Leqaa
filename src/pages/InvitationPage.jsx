import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Landing from '../components/invitation/Landing'
import Curtain from '../components/invitation/Curtain'

export default function InvitationPage() {
  const [screen, setScreen] = useState('landing') // 'landing' | 'curtain'
  const transitioning = useRef(false)

  const handleSealClick = () => {
    if (transitioning.current || screen !== 'landing') return
    transitioning.current = true
    // Landing fades + zooms out, then curtain mounts
    setTimeout(() => {
      setScreen('curtain')
      transitioning.current = false
    }, 820)
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      dir="rtl"
      // Prevent body scroll under the invitation
      style={{ touchAction: 'none' }}
    >
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div
            key="landing"
            className="absolute inset-0"
            initial={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.045,
              filter: 'blur(4px)',
              transition: {
                duration: 0.82,
                ease: [0.43, 0.13, 0.23, 0.96],
              },
            }}
          >
            <Landing onSealClick={handleSealClick} />
          </motion.div>
        )}

        {screen === 'curtain' && (
          <motion.div
            key="curtain"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <Curtain />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
