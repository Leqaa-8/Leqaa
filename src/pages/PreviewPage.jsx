import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MousePointerClick, ExternalLink } from 'lucide-react'
import { getTemplateById } from '../data/templates'

export default function PreviewPage() {
  const { id } = useParams()
  const template = getTemplateById(id)

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-luxury">
        <div className="text-center">
          <p className="text-2xl font-bold text-text font-arabic mb-4">القالب غير موجود</p>
          <Link to="/templates" className="text-primary font-arabic hover:underline">العودة للقوالب</Link>
        </div>
      </div>
    )
  }

  // إذا كان للقالب رابط معاينة خارجي، وجّه المستخدم مباشرة
  if (template.previewUrl) {
    return (
      <main className="min-h-screen bg-gradient-luxury pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-6xl mb-6 block">{template.icon}</span>
            <h1 className="text-2xl font-bold text-text font-arabic mb-3">{template.name}</h1>
            <p className="text-text-muted font-arabic text-sm mb-8 font-light leading-relaxed">{template.description}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={template.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-white font-semibold px-8 py-3.5 rounded-full shadow-luxury hover:shadow-luxury-lg hover:-translate-y-0.5 transition-all duration-300 font-arabic"
              >
                <ExternalLink size={17} />
                فتح المعاينة
              </a>
              <Link
                to={`/order?template=${template.id}`}
                className="inline-flex items-center justify-center gap-2 border-2 border-border text-text font-medium px-8 py-3.5 rounded-full hover:border-primary hover:text-primary transition-all duration-300 font-arabic"
              >
                <MousePointerClick size={17} />
                اختيار القالب
              </Link>
            </div>
            <div className="mt-6">
              <Link to="/templates" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-arabic text-sm">
                <ArrowRight size={14} />
                العودة للقوالب
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  // قالب بدون رابط خارجي — عرض الفيديو
  return (
    <main className="min-h-screen bg-gradient-luxury pt-24 pb-16">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <Link to="/templates" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-arabic text-sm mb-8">
          <ArrowRight size={15} />
          العودة للقوالب
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-card border border-border text-primary text-sm font-medium px-5 py-2 rounded-full shadow-luxury mb-4 font-arabic">
            معاينة القالب
          </div>
          <h1 className="text-2xl font-bold text-text font-arabic mb-1.5">{template.name}</h1>
          <p className="text-text-muted font-arabic text-sm font-light">{template.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden shadow-luxury-lg border border-border/40 mb-8"
        >
          <video
            autoPlay loop muted playsInline
            className="w-full"
            aria-label={`معاينة ${template.name}`}
          >
            <source src={template.videoMp4} type="video/mp4" />
            <source src={template.videoMov} type="video/quicktime" />
            <div className="bg-blush p-12 text-center text-text-muted font-arabic text-sm">
              المتصفح لا يدعم تشغيل الفيديو
            </div>
          </video>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
          <Link
            to={`/order?template=${template.id}`}
            className="inline-flex items-center gap-2 bg-gradient-gold text-white font-bold px-9 py-4 rounded-full shadow-luxury-lg hover:-translate-y-0.5 transition-all duration-300 font-arabic"
          >
            <MousePointerClick size={19} />
            اختيار هذا القالب
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
