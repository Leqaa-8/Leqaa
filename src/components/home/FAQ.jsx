import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import { faqs } from '../../data/faq'

const WA_LINK = 'https://wa.me/966502779766?text=' + encodeURIComponent('السلام عليكم، لدي سؤال عن خدمة لقاء 🤍')

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45 }}
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border-primary/30 bg-card shadow-luxury'
          : 'border-border bg-card/60 hover:border-primary/20 hover:bg-card'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-right"
        aria-expanded={isOpen}
      >
        <span className={`font-medium text-sm font-arabic transition-colors duration-300 text-right flex-1 ${isOpen ? 'text-primary' : 'text-text'}`}>
          {faq.question}
        </span>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-primary text-white' : 'bg-blush text-text-muted'
        }`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5">
              <div className="h-px bg-gradient-to-r from-primary/20 to-transparent mb-3.5" />
              <p className="text-text-muted text-sm leading-relaxed font-arabic font-light whitespace-pre-line">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null)

  return (
    <section className="section-padding bg-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(185,154,122,0.05)_0%,_transparent_50%)] pointer-events-none" />

      <div className="max-w-2xl mx-auto">
        <SectionTitle
          label="FAQ"
          title="الأسئلة"
          highlight="الشائعة"
          subtitle="إجابات على أكثر الأسئلة التي يسألها عملاؤنا"
        />

        <div className="space-y-2.5">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center p-7 bg-blush/40 rounded-3xl border border-border/60"
        >
          <p className="text-text font-semibold font-arabic mb-1.5">لم تجد إجابة لسؤالك؟</p>
          <p className="text-text-muted text-sm font-arabic mb-5 font-light">تواصل معنا مباشرةً وسيسعدنا مساعدتك</p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-gold text-white font-semibold px-7 py-3 rounded-full shadow-luxury hover:shadow-luxury-lg hover:-translate-y-0.5 transition-all duration-300 font-arabic text-sm"
          >
            تواصل عبر واتساب
          </a>
        </motion.div>
      </div>
    </section>
  )
}
