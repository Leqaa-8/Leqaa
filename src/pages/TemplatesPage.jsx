import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Eye, MousePointerClick, Clock, ArrowRight, X } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import { templates } from '../data/templates'

function TemplateVideoPreview({ src, fallbackMov, title }) {
  return (
    <div className="relative w-full overflow-hidden bg-blush" style={{ height: 320 }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={`معاينة فيديو ${title}`}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      >
        <source src={src} type="video/mp4" />
        <source src={fallbackMov} type="video/quicktime" />
        <p className="sr-only">متصفحك لا يدعم تشغيل الفيديو.</p>
      </video>
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
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="relative bg-card rounded-3xl overflow-hidden shadow-luxury-lg w-full max-w-xs"
          onClick={(e) => e.stopPropagation()}
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
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.12 }}
        whileHover={{ y: -5 }}
        className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/60"
      >
        <div className="overflow-hidden rounded-t-3xl">
          <TemplateVideoPreview
            src={template.videoMp4}
            fallbackMov={template.videoMov}
            title={template.name}
          />
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-text font-arabic mb-1.5">{template.name}</h3>
          <p className="text-text-muted text-sm leading-relaxed font-arabic font-light mb-4">
            {template.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {template.features.map((f) => (
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

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-gradient-luxury pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-arabic text-sm"
          >
            <ArrowRight size={15} />
            العودة للرئيسية
          </Link>
        </motion.div>

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
    </main>
  )
}
