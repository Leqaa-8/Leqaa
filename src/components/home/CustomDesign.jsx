import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'

const FEATURES = [
  { icon: '🎨', title: 'تصميم حسب الطلب', desc: 'ألوان وخطوط وعناصر تناسب ذوقك تمامًا' },
  { icon: '🎵', title: 'موسيقى مخصصة', desc: 'أضف الأغنية أو المقطع الذي تحبه' },
  { icon: '🖼️', title: 'صور وعناصر بصرية', desc: 'أرفق صورة أو وصف للإلهام الذي تريده' },
  { icon: '✨', title: 'لمسة شخصية كاملة', desc: 'كل تفصيلة فيها بصمتك أنت' },
]

export default function CustomDesign() {
  return (
    <section className="section-padding bg-gradient-to-b from-blush/30 to-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blush/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <SectionTitle
          label="Custom"
          title="صمم دعوتك"
          highlight="بشكل خاص"
          subtitle="مناسبتك فريدة — دعوتك تستحق أن تكون كذلك"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border/60 rounded-2xl p-5 flex items-start gap-4 shadow-card"
            >
              <span className="text-2xl flex-shrink-0">{f.icon}</span>
              <div>
                <p className="font-semibold text-text font-arabic text-sm mb-0.5">{f.title}</p>
                <p className="text-text-muted font-arabic text-xs font-light leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card border border-border/60 rounded-3xl p-7 sm:p-9 text-center shadow-card"
        >
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary text-xs font-semibold font-arabic px-4 py-1.5 rounded-full mb-5">
            ✨ تصميم مخصص بالكامل
          </div>

          <p className="text-text-muted font-arabic text-sm mb-1 font-light">يبدأ من</p>
          <div className="mb-1">
            <span className="font-bold text-gradient-gold font-arabic" style={{ fontSize: 'clamp(3.5rem, 10vw, 5rem)', lineHeight: 1.1 }}>300</span>
            <span className="text-text-muted font-arabic text-xl mr-2">ريال</span>
          </div>
          <p className="text-text-muted font-arabic text-xs mb-7 font-light">
            * السعر النهائي يعتمد على تفاصيل التصميم المطلوبة.
          </p>

          <Link
            to="/order?template=custom"
            className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-white font-semibold px-9 py-3.5 rounded-full shadow-luxury hover:shadow-luxury-lg hover:-translate-y-0.5 transition-all duration-300 font-arabic text-sm"
          >
            ابدأ تصميم دعوتك
            <ArrowLeft size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
