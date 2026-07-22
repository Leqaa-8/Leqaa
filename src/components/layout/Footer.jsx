import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Instagram, MessageCircle, Heart } from 'lucide-react'

const WA_LINK = 'https://wa.me/966502779766?text=' + encodeURIComponent('السلام عليكم، أرغب في طلب دعوة رقمية من لقاء 🤍')

const socialLinks = [
  {
    label: 'Instagram',
    icon: Instagram,
    href: 'https://www.instagram.com/liqaa.8?igsh=cXFpdWw3YjFlcmY2&utm_source=qr',
    hoverClass: 'hover:text-rose-400 hover:border-rose-400/40',
  },
  {
    label: 'TikTok',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
    href: 'https://www.tiktok.com/@.liqaa0?_r=1&_t=ZS-98EFkoNY1j6',
    hoverClass: 'hover:text-text hover:border-text/40',
  },
  {
    label: 'WhatsApp',
    icon: MessageCircle,
    href: WA_LINK,
    hoverClass: 'hover:text-green-400 hover:border-green-400/40',
  },
]

const footerLinks = [
  { label: 'الرئيسية', href: '/', anchor: null },
  { label: 'كيف تعمل؟', href: '/#how-it-works', anchor: 'how-it-works' },
  { label: 'القوالب', href: '/#templates', anchor: 'templates' },
  { label: 'آراء العملاء', href: '/#testimonials', anchor: 'testimonials' },
]

export default function Footer() {
  const handleAnchor = (e, anchor) => {
    if (!anchor) return
    e.preventDefault()
    const el = document.getElementById(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="bg-dark text-offwhite relative overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-luxury">
                <span className="text-white font-bold text-lg font-english">L</span>
              </div>
              <div>
                <div className="font-bold text-lg font-english tracking-widest text-white/90 group-hover:text-primary-light transition-colors">
                  LEQAA
                </div>
                <div className="text-xs text-primary-light/70 font-arabic">لقاء</div>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed font-arabic mb-5">
              منصة متخصصة في تصميم الدعوات الرقمية التفاعلية، نحوّل مناسباتك إلى تجربة لا تُنسى.
            </p>
            <p className="text-white/40 text-xs font-arabic mb-5">
              تابعونا على إنستقرام وتيك توك لمشاهدة أحدث الدعوات والتصاميم الرقمية.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, icon: Icon, href, hoverClass }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  className={`w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/55 ${hoverClass} transition-all duration-300 hover:bg-white/15`}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white/80 mb-5 font-arabic text-sm tracking-wide">روابط سريعة</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchor(e, link.anchor)}
                    className="text-white/45 hover:text-primary-light transition-colors duration-300 font-arabic text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white/80 mb-5 font-arabic text-sm tracking-wide">تواصل معنا</h3>
            <div className="space-y-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/45 hover:text-green-400 transition-colors duration-300 font-arabic text-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center group-hover:bg-green-500/15 transition-colors flex-shrink-0">
                  <MessageCircle size={15} />
                </div>
                واتساب: 0502779766
              </a>
              <a
                href="https://www.instagram.com/liqaa.8?igsh=cXFpdWw3YjFlcmY2&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/45 hover:text-rose-400 transition-colors duration-300 font-arabic text-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center group-hover:bg-rose-500/15 transition-colors flex-shrink-0">
                  <Instagram size={15} />
                </div>
                @liqaa.8
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-7 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs font-arabic text-center">
            © {new Date().getFullYear()} لقاء — LEQAA. جميع الحقوق محفوظة.
          </p>
          <p className="text-white/25 text-xs flex items-center gap-1.5 font-arabic">
            صُنع بـ <Heart size={11} className="text-rose-400 fill-rose-400" /> في المملكة العربية السعودية
          </p>
        </div>
      </div>
    </footer>
  )
}
