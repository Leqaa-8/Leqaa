import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logo from '../../assets/logo.png'

const WA_LINK = 'https://wa.me/966502779766?text=' + encodeURIComponent('السلام عليكم، أرغب في طلب دعوة رقمية من لقاء 🤍')

const navLinks = [
  { label: 'الرئيسية', href: '/', anchor: null },
  { label: 'كيف تعمل؟', href: '/#how-it-works', anchor: 'how-it-works' },
  { label: 'القوالب', href: '/#templates', anchor: 'templates' },
  { label: 'آراء العملاء', href: '/#testimonials', anchor: 'testimonials' },
  { label: 'تواصل معنا', href: '/#contact', anchor: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // منع التمرير خلف القائمة على الجوال
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (e, link) => {
    e.preventDefault()
    setMenuOpen(false)

    if (link.anchor === null) {
      navigate('/')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(link.anchor)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(link.anchor)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-bg-soft/95 backdrop-blur-xl shadow-card border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 group flex-shrink-0">
              <img
                src={logo}
                alt="شعار لقاء"
                className="rounded-full object-contain border border-border shadow-sm flex-shrink-0"
                style={{ width: 44, height: 44 }}
              />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-dark text-base font-english tracking-widest group-hover:text-primary transition-colors duration-300">
                  LEQAA
                </span>
                <span className="text-text-muted text-[11px] font-arabic tracking-wide">لقاء</span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-text-muted hover:text-text transition-colors duration-300 font-medium text-sm font-arabic relative group whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 right-0 left-0 h-px bg-gradient-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-right" />
                </a>
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="اطلب الآن عبر واتساب"
                className="hidden sm:inline-flex items-center gap-2 bg-gradient-gold text-white font-semibold px-5 py-2.5 rounded-full text-sm shadow-luxury hover:shadow-luxury-lg hover:-translate-y-0.5 transition-all duration-300 font-arabic whitespace-nowrap"
              >
                اطلب الآن
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-blush hover:bg-blush-dark transition-colors duration-300"
                aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X size={20} className="text-text" />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu size={20} className="text-text" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-text/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="fixed top-16 sm:top-20 inset-x-0 z-40 bg-bg-soft/98 backdrop-blur-xl border-b border-border shadow-luxury-lg lg:hidden"
            >
              <div className="px-6 py-5 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className="flex items-center text-text font-medium text-base font-arabic py-3 border-b border-border/60 hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }} className="pt-4">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center bg-gradient-gold text-white font-semibold px-6 py-3.5 rounded-2xl text-base shadow-luxury font-arabic w-full"
                  >
                    اطلب دعوتك الآن
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
