import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, Clock, Heart, Zap, Sparkles } from 'lucide-react'

const WA_LINK = 'https://wa.me/966502779766?text=' + encodeURIComponent('السلام عليكم، أرغب في طلب دعوة رقمية من لقاء 🤍')

const VIDEOS = [
  { src: '/video/video.w.web.mp4', poster: '/images/poster-w.jpg', label: 'دعوة زواج' },
  { src: '/video/video.g.web.mp4', poster: '/images/poster-g.jpg', label: 'دعوة تخرج' },
]

const FEATURES = [
  { icon: Star,  text: 'تصميم فاخر' },
  { icon: Clock, text: 'تسليم خلال ٤٨ ساعة' },
  { icon: Zap,   text: 'مشاركة فورية' },
  { icon: Heart, text: 'دعم على واتساب' },
]

const STATS = [
  { symbol: '⭐', value: '٤.٩',      label: 'تقييم العملاء' },
  { symbol: '🕒', value: '٤٨ ساعة', label: 'وقت التسليم' },
  { symbol: '🤍', value: '٥',        label: 'دعوات تم تسليمها' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function PhoneVideo({ src, poster }) {
  const videoRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    setLoaded(false)
    v.load()
    v.play().catch(() => {})
  }, [src])

  return (
    <>
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      />
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        preload="metadata"
        onLoadedData={() => setLoaded(true)}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </>
  )
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % VIDEOS.length), 5000)
    return () => clearInterval(t)
  }, [])

  // Pause videos when section scrolls off screen
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.querySelectorAll('video').forEach(v => {
          if (entry.isIntersecting) {
            v.play().catch(() => {})
          } else {
            v.pause()
          }
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-luxury">
      {/* Background glows */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-primary/[0.07] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blush/60 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/[0.04] rounded-full blur-[60px] pointer-events-none" />

      {/* Botanical decoration */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.045] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="14%" y1="8%"  x2="14%" y2="92%" stroke="#B99A7A" strokeWidth="1" />
        <line x1="14%" y1="28%" x2="6%"  y2="18%" stroke="#B99A7A" strokeWidth="0.8" />
        <line x1="14%" y1="44%" x2="5%"  y2="36%" stroke="#B99A7A" strokeWidth="0.8" />
        <line x1="14%" y1="58%" x2="23%" y2="46%" stroke="#B99A7A" strokeWidth="0.8" />
        <line x1="14%" y1="72%" x2="22%" y2="64%" stroke="#B99A7A" strokeWidth="0.8" />
        <circle cx="85%" cy="16%" r="56" stroke="#B99A7A" strokeWidth="0.6" fill="none" />
        <circle cx="85%" cy="16%" r="36" stroke="#B99A7A" strokeWidth="0.4" fill="none" />
        <ellipse cx="85%" cy="16%" rx="18" ry="56" stroke="#B99A7A" strokeWidth="0.35" fill="none" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ── Text ── */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-right">

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-card/80 backdrop-blur border border-border text-primary text-sm font-medium px-5 py-2 rounded-full shadow-luxury mb-7 font-arabic"
            >
              <Sparkles size={13} />
              دعوات رقمية تفاعلية فاخرة
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
              className="flex flex-col items-center lg:items-start gap-2 sm:gap-3 font-arabic mb-5"
            >
              <span
                className="block font-semibold text-text"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.1rem)', lineHeight: 1.28, letterSpacing: '-0.01em' }}
              >
                ليست مجرد دعوة...
              </span>
              <span
                className="block font-semibold text-gradient-gold"
                style={{ fontSize: 'clamp(1.85rem, 4.6vw, 2.9rem)', lineHeight: 1.28, letterSpacing: '-0.01em' }}
              >
                بل تجربة رقمية
              </span>
              <span
                className="block font-semibold text-text"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.1rem)', lineHeight: 1.28, letterSpacing: '-0.01em' }}
              >
                تبدأ من أول لمسة.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.52 }}
              className="text-text-muted text-base sm:text-lg max-w-lg leading-relaxed font-arabic mb-8 font-light"
            >
              لقاء منصة متخصصة في تصميم الدعوات الرقمية التفاعلية للمناسبات، بقوالب راقية وتجربة مصممة لتبقى في الذاكرة.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.67 }}
              className="flex flex-col sm:flex-row items-center gap-3.5 mb-8 w-full sm:w-auto"
            >
              <button
                onClick={() => scrollToSection('templates')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-gold text-white font-semibold px-9 py-3.5 rounded-full shadow-luxury hover:shadow-luxury-lg hover:-translate-y-0.5 transition-all duration-300 text-base font-arabic"
              >
                استعرض القوالب
              </button>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-border text-text font-semibold px-9 py-3.5 rounded-full hover:border-primary hover:text-primary transition-all duration-300 text-base font-arabic hover:-translate-y-0.5"
              >
                اطلب دعوتك
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.82 }}
              className="grid grid-cols-2 gap-x-8 gap-y-3.5"
            >
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-blush flex items-center justify-center flex-shrink-0">
                    <f.icon size={13} className="text-primary" strokeWidth={1.7} />
                  </div>
                  <span className="text-text-muted text-sm font-arabic">{f.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── iPhone Mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2 flex justify-center items-center py-4"
          >
            <div className="relative">
              <div
                style={{
                  position: 'absolute', inset: -24,
                  background: 'rgba(185,154,122,0.22)',
                  borderRadius: '50%', filter: 'blur(64px)',
                  pointerEvents: 'none',
                }}
              />

              {/* iPhone 16 Pro frame */}
              <div
                className="phone-mockup-frame"
                style={{
                  position: 'relative', zIndex: 1,
                  aspectRatio: '9/19.5',
                  background: 'linear-gradient(145deg, #2e2e2e 0%, #1c1c1c 50%, #252525 100%)',
                  borderRadius: 48,
                  padding: 10,
                  boxShadow:
                    '0 60px 100px rgba(0,0,0,0.40), ' +
                    '0 20px 40px rgba(0,0,0,0.22), ' +
                    'inset 0 0 0 1px rgba(255,255,255,0.10), ' +
                    'inset 0 1px 0 rgba(255,255,255,0.16)',
                }}
              >
                <div style={{ position:'absolute', left:-3, top:88,  width:3, height:36, background:'#2a2a2a', borderRadius:'2px 0 0 2px' }} />
                <div style={{ position:'absolute', left:-3, top:136, width:3, height:64, background:'#2a2a2a', borderRadius:'2px 0 0 2px' }} />
                <div style={{ position:'absolute', right:-3, top:108, width:3, height:68, background:'#2a2a2a', borderRadius:'0 2px 2px 0' }} />

                {/* Screen */}
                <div
                  style={{
                    position: 'relative', width: '100%', height: '100%',
                    background: '#000', borderRadius: 40, overflow: 'hidden',
                  }}
                >
                  {/* Single active video with poster */}
                  <PhoneVideo
                    key={VIDEOS[current].src}
                    src={VIDEOS[current].src}
                    poster={VIDEOS[current].poster}
                  />

                  {/* Label badge */}
                  <motion.div
                    key={current + '-lbl'}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.55 }}
                    style={{
                      position: 'absolute', bottom: 42, left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(0,0,0,0.52)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      color: '#fff', fontSize: 11,
                      fontFamily: 'Alexandria, Tajawal, sans-serif',
                      padding: '4px 16px', borderRadius: 20,
                      whiteSpace: 'nowrap', zIndex: 20,
                      border: '1px solid rgba(255,255,255,0.13)',
                    }}
                  >
                    {VIDEOS[current].label}
                  </motion.div>

                  {/* Dot indicators */}
                  <div
                    style={{
                      position: 'absolute', bottom: 20, left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex', gap: 5, zIndex: 20,
                      direction: 'ltr',
                    }}
                  >
                    {VIDEOS.map((_, i) => (
                      <div
                        key={i}
                        style={{
                          height: 5,
                          width: i === current ? 18 : 5,
                          borderRadius: 3,
                          background: i === current ? '#B99A7A' : 'rgba(255,255,255,0.4)',
                          transition: 'width 0.4s ease, background 0.4s ease',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.05 }}
          className="mt-10 lg:mt-8"
        >
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-card grid grid-cols-3">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`text-center py-4 px-3 ${i > 0 ? 'border-r border-border' : ''}`}
              >
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <span className="text-base leading-none">{s.symbol}</span>
                  <span className="text-xl sm:text-2xl font-bold font-arabic text-primary whitespace-nowrap">{s.value}</span>
                </div>
                <div className="text-text-muted text-[11px] sm:text-xs font-arabic">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-border flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
