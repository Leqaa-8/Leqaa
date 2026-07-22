import { motion } from 'framer-motion'
import { LayoutTemplate, ClipboardList, Sparkles } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'

const steps = [
  {
    icon: LayoutTemplate,
    step: '01',
    title: 'اختر القالب',
    description: 'تصفح القوالب واختر التصميم الذي يناسب مناسبتك، سواء كانت زواجًا أو تخرجًا.',
  },
  {
    icon: ClipboardList,
    step: '02',
    title: 'أدخل بيانات المناسبة',
    description: 'أكمل النموذج بأسماء المناسبة وتاريخها ومكانها وجميع التفاصيل المطلوبة.',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'استلم دعوتك',
    description: 'بعد مراجعة البيانات يتم تجهيز دعوتك وإرسال رابطها خلال مدة تصل إلى ٤٨ ساعة.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding section-scroll-offset bg-bg-soft relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(185,154,122,0.06)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <SectionTitle
          label="How It Works"
          title="كيف تعمل"
          highlight="الخدمة؟"
          subtitle="ثلاث خطوات بسيطة تفصلك عن دعوة رقمية تُبهر ضيوفك"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              className="group"
            >
              <div className="bg-card rounded-3xl p-7 border border-border shadow-card hover:shadow-card-hover transition-all duration-500 h-full flex flex-col items-center text-center">

                {/* Numbered circle */}
                <div className="relative mb-6 flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-luxury"
                    style={{ background: 'linear-gradient(135deg, #B99A7A 0%, #D4BAA0 100%)' }}
                  >
                    <span className="text-white font-bold text-lg font-english leading-none select-none">
                      {step.step}
                    </span>
                  </div>
                  {/* Icon badge */}
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-blush border-2 border-card flex items-center justify-center shadow-sm">
                    <step.icon size={11} className="text-primary" strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-text mb-2.5 font-arabic">
                  {step.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed font-arabic font-light flex-1">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
