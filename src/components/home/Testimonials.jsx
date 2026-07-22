import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, ThumbsUp, Star, Quote } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import { testimonials } from '../../data/testimonials'

// مفتاح localStorage — سهل الربط بباك إند لاحقًا
const STORAGE_KEY = 'leqaa_reactions_v1'

function getStored() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function saveStored(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

function StarRow({ count = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`تقييم ${count} نجوم`}>
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={13} className="text-primary fill-primary" />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }) {
  const stored = getStored()
  const [hearted, setHearted] = useState(stored[testimonial.id]?.heart || false)
  const [liked, setLiked] = useState(stored[testimonial.id]?.like || false)
  const [heartCount, setHeartCount] = useState(stored[testimonial.id]?.heartCount || 0)
  const [likeCount, setLikeCount] = useState(stored[testimonial.id]?.likeCount || 0)

  const toggleHeart = () => {
    const newVal = !hearted
    const newCount = newVal ? heartCount + 1 : Math.max(0, heartCount - 1)
    setHearted(newVal)
    setHeartCount(newCount)
    const all = getStored()
    saveStored({ ...all, [testimonial.id]: { ...all[testimonial.id], heart: newVal, heartCount: newCount } })
  }

  const toggleLike = () => {
    const newVal = !liked
    const newCount = newVal ? likeCount + 1 : Math.max(0, likeCount - 1)
    setLiked(newVal)
    setLikeCount(newCount)
    const all = getStored()
    saveStored({ ...all, [testimonial.id]: { ...all[testimonial.id], like: newVal, likeCount: newCount } })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55 }}
      className="bg-card rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/60 relative group flex flex-col"
    >
      {/* Quote decoration */}
      <div className="absolute top-5 left-5 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity pointer-events-none">
        <Quote size={44} className="text-primary rotate-180" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${testimonial.avatarBg} flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-card font-arabic`}>
          {testimonial.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-text text-sm font-arabic">{testimonial.name}</div>
          <div className="text-text-muted text-xs font-arabic mt-0.5">{testimonial.event}</div>
        </div>
        <div className="flex-shrink-0">
          <StarRow count={testimonial.rating} />
        </div>
      </div>

      {/* Comment */}
      <p className="text-text/80 text-sm leading-[1.85] font-arabic relative z-10 flex-1 mb-5 font-light">
        {testimonial.comment}
      </p>

      {/* Reactions */}
      <div className="flex items-center justify-end gap-4 border-t border-border/40 pt-4">
        <button
          onClick={toggleHeart}
          aria-label={hearted ? 'إلغاء الإعجاب بالقلب' : 'أعجبني بالقلب'}
          className="flex items-center gap-1.5 text-xs font-arabic transition-all duration-200 group/btn"
        >
          <motion.div whileTap={{ scale: 1.45 }}>
            <Heart
              size={16}
              className={`transition-all duration-200 ${hearted ? 'text-rose-400 fill-rose-400 scale-110' : 'text-text-muted/50 group-hover/btn:text-rose-300'}`}
            />
          </motion.div>
          {heartCount > 0 && (
            <span className={`font-medium ${hearted ? 'text-rose-400' : 'text-text-muted/50'}`}>
              {heartCount}
            </span>
          )}
        </button>

        <button
          onClick={toggleLike}
          aria-label={liked ? 'إلغاء الإعجاب' : 'أعجبني'}
          className="flex items-center gap-1.5 text-xs font-arabic transition-all duration-200 group/btn"
        >
          <motion.div whileTap={{ scale: 1.45 }}>
            <ThumbsUp
              size={16}
              className={`transition-all duration-200 ${liked ? 'text-primary fill-primary scale-110' : 'text-text-muted/50 group-hover/btn:text-primary/60'}`}
            />
          </motion.div>
          {likeCount > 0 && (
            <span className={`font-medium ${liked ? 'text-primary' : 'text-text-muted/50'}`}>
              {likeCount}
            </span>
          )}
        </button>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding section-scroll-offset bg-bg-soft relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-primary/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <SectionTitle
          label="Testimonials"
          title="ماذا قال"
          highlight="عملاؤنا؟"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-center mt-10"
        >
          <p className="text-text-muted text-sm font-arabic mb-4">هل جربت خدماتنا؟ شاركنا رأيك</p>
          <a
            href={'https://wa.me/966502779766?text=' + encodeURIComponent('السلام عليكم، أريد مشاركة تقييمي لخدمة لقاء 🤍')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-border text-text-muted font-medium px-7 py-2.5 rounded-full hover:border-primary hover:text-primary transition-all duration-300 text-sm font-arabic"
          >
            أرسل تقييمك
          </a>
        </motion.div>
      </div>
    </section>
  )
}
