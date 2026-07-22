import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Eye, MousePointerClick, Clock, X } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import { templates } from '../../data/templates'

function CardPhoneMockup({ src, poster, title }) {
  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{
        height: 340,
        background: 'linear-gradient(160deg, #FDF9F5 0%, #F3E4DD 65%, #E8D2C6 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 130, height: 180,
          background: 'rgba(185,154,122,0.2)',
          borderRadius: '50%', filter: 'blur(42px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative', zIndex: 1,
          width: 122,
          aspectRatio: '9/19.5',
          background: 'linear-gradient(145deg, #2e2e2e 0%, #1c1c1c 50%, #252525 100%)',
          borderRadius: 28,
          padding: 6,
          boxShadow:
            '0 30px 70px rgba(0,0,0,0.40), ' +
            '0 8px 24px rgba(0,0,0,0.20), ' +
            'inset 0 0 0 1px rgba(255,255,255,0.10)',
        }}
      >
        <div
          style={{
            position: 'relative', width: '100%', height: '100%',
            background: '#000', borderRadius: 23, overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute', top: 6, left: '50%',
              transform: 'translateX(-50%)',
              width: 46, height: 13,
              background: '#000', borderRadius: 10,
              zIndex: 10,
              boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
            }}
          />
          {poster && (
            <img
              src={poster} alt="" aria-hidden="true"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
          <video
            autoPlay muted loop playsInline preload="metadata"
            aria-label={`معاينة ${title}`}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
            }}
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  )
}

function VideoModal({ src, fallbackMov, title, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="relative bg-card rounded-3xl overflow-hidden shadow-luxury-lg w-full max-w-xs"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="إغلاق المعاينة"
            className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X size={17} />
          </button>
          <video
            autoPlay loop muted playsInline preload="auto"
            aria-label={`معاينة ${title}`}
            style={{ display: 'block', width: '100%', aspectRatio: '9/16', objectFit: 'cover' }}
          >
            <source src={src} type="video/mp4" />
            <source src={fallbackMov} type="video/quicktime" />
          </video>
          <div className="p-4 text-center">
            <p className="text-text font-semibold font-arabic text-sm">{title}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function TemplateCard({ template, index }) {
  const [modalOpen, setModalOpen] = useState(false)

  const handlePreview = () => {
    if (template.previewUrl) {
      window.open(template.previewUrl, '_blank', 'noopener,noreferrer')
    } else {
      setModalOpen(true)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.65, delay: index * 0.12 }}
        whileHover={{ y: -5 }}
        className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/60"
      >
        {/* Phone mockup area */}
        <div className="overflow-hidden rounded-t-3xl">
          <CardPhoneMockup src={template.videoWeb} poster={template.poster} title={template.name} />
        </div>

        {/* Template info */}
        <div className="p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-text font-arabic mb-1.5">{template.name}</h3>
          <p className="text-text-muted text-sm leading-relaxed font-arabic font-light mb-4">
            {template.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {template.features.map(f => (
              <span key={f} className="bg-blush text-text-muted text-xs px-3 py-1 rounded-full font-arabic">
                {f}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-1.5 text-xs text-text-muted font-arabic">
              <Clock size={12} className="text-primary flex-shrink-0" />
              <span>وقت التنفيذ: {template.deliveryTime}</span>
            </div>
            <span className="text-primary font-bold font-arabic text-base">{template.price}</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePreview}
              aria-label={`معاينة ${template.name}`}
              className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-border text-text-muted font-medium py-2.5 rounded-2xl hover:border-primary hover:text-primary transition-all duration-300 text-sm font-arabic"
            >
              <Eye size={15} />
              معاينة القالب
            </button>
            <Link
              to={`/order?template=${template.id}`}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-gold text-white font-semibold py-2.5 rounded-2xl shadow-luxury hover:shadow-luxury-lg hover:-translate-y-0.5 transition-all duration-300 text-sm font-arabic"
            >
              <MousePointerClick size={15} />
              اختيار القالب
            </Link>
          </div>
        </div>
      </motion.div>

      {modalOpen && (
        <VideoModal
          src={template.videoMp4}
          fallbackMov={template.videoMov}
          title={template.name}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}

export default function TemplatesPreview() {
  return (
    <section
      id="templates"
      className="section-padding section-scroll-offset bg-gradient-to-b from-bg to-blush/30 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blush/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="Templates"
          title="القوالب"
          highlight="الجاهزة"
          subtitle="قوالب صُممت بعناية لتناسب أجمل مناسباتك"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {templates.map((template, index) => (
            <TemplateCard key={template.id} template={template} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
