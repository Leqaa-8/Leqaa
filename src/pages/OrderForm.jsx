import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, Send } from 'lucide-react'
import WeddingForm from '../components/form/WeddingForm'
import GraduationForm from '../components/form/GraduationForm'
import CustomForm from '../components/form/CustomForm'
import OrderReview from '../components/form/OrderReview'
import { getTemplateById, templates } from '../data/templates'

const WA_NUMBER = '966502779766'

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    return new Intl.DateTimeFormat('ar-u-ca-gregory', {
      day: 'numeric', month: 'long', year: 'numeric',
    }).format(new Date(dateStr + 'T12:00:00'))
  } catch {
    return dateStr
  }
}

function line(label, value) {
  if (!value || !String(value).trim()) return null
  return `${label}: ${String(value).trim()}`
}

function buildWhatsAppMessage(templateId, formData) {
  if (templateId === 'wedding') {
    const city = formData.city === 'أخرى' ? formData.customCity : formData.city
    const musicLabel = formData.musicChoice === 'custom' ? 'رابط موسيقى مخصص' : 'موسيقى القالب'
    const lines = [
      'السلام عليكم، أرغب في طلب قالب دعوة زواج من لقاء 🤍',
      '',
      line('اسم العريس',  formData.groomName),
      line('اسم العروس',  formData.brideName),
      line('اسم الداعي',  formData.hostName),
      line('التاريخ',     formatDate(formData.weddingDate)),
      line('المكان',      formData.venueName),
      line('المدينة',     city),
      line('رابط الموقع', formData.locationUrl),
      '',
      'برنامج الحفل:',
      line('الاستقبال',   formData.receptionTime),
      line('الزفة',       formData.zaffaTime),
      line('العشاء',      formData.dinnerTime),
      '',
      line('الموسيقى',       musicLabel),
      formData.musicChoice === 'custom' ? line('رابط الموسيقى', formData.musicUrl) : null,
      '',
      'السعر: 200 ريال',
    ]
    return lines.filter(l => l !== null).join('\n')
  }

  if (templateId === 'graduation') {
    const musicLabel = formData.musicChoice === 'custom' ? 'رابط موسيقى مخصص' : 'موسيقى القالب'
    const gradCity = formData.city === 'أخرى' ? formData.customCity : formData.city
    const lines = [
      'السلام عليكم، أرغب في طلب قالب دعوة تخرج من لقاء 🤍',
      '',
      line('اسم الخريج أو الخريجة', formData.graduateName),
      line('الجامعة أو المدرسة',    formData.university),
      line('التخصص أو المرحلة',     formData.major),
      line('سنة التخرج',            formData.graduationYear),
      line('التاريخ',               formatDate(formData.eventDate)),
      line('وقت الحفل',             formData.eventTime),
      line('المكان',                formData.venueName),
      line('المدينة',               gradCity),
      line('رابط الموقع',           formData.locationUrl),
      line('اسم الداعي',            formData.hostName),
      '',
      line('الموسيقى',       musicLabel),
      formData.musicChoice === 'custom' ? line('رابط الموسيقى', formData.musicUrl) : null,
      '',
      'السعر: 150 ريال',
    ]
    return lines.filter(l => l !== null).join('\n')
  }

  // custom
  const musicLabel = formData.musicChoice === 'custom' ? 'رابط موسيقى مخصص' : 'بدون موسيقى / اختيار لاحق'
  const lines = [
    'السلام عليكم، أرغب في طلب تصميم دعوة خاصة من لقاء 🤍',
    '',
    line('نوع المناسبة',  formData.occasionType),
    line('اسم المناسبة',  formData.occasionName),
    line('اسم الداعي',   formData.hostName),
    line('التاريخ',      formatDate(formData.eventDate)),
    line('الوقت',        formData.eventTime),
    line('المكان',       formData.venueName),
    line('رابط الموقع',  formData.locationUrl),
    '',
    'تفاصيل التصميم:',
    line('الألوان',      formData.preferredColors),
    line('وصف الفكرة',   formData.designIdea),
    '',
    line('الموسيقى',       musicLabel),
    formData.musicChoice === 'custom' ? line('رابط الموسيقى', formData.musicUrl) : null,
    formData.inspirationUrl ? line('رابط الإلهام', formData.inspirationUrl) : null,
    formData.inspirationFile ? `صورة إلهام: ${formData.inspirationFile} (سيتم إرسالها بشكل منفصل)` : null,
    formData.additionalDetails ? line('ملاحظات', formData.additionalDetails) : null,
    formData.contactPhone ? line('رقم الجوال', formData.contactPhone) : null,
    '',
    'السعر: يبدأ من 300 ريال',
  ]
  return lines.filter(l => l !== null).join('\n')
}

const STEPS = [
  { id: 'template', label: 'القالب' },
  { id: 'details', label: 'التفاصيل' },
  { id: 'review', label: 'المراجعة' },
]

const CUSTOM_OPTION = {
  id: 'custom',
  icon: '✨',
  name: 'تصميم مخصص',
  description: 'تصميم دعوة فريدة بالكامل حسب ذوقك وتفاصيل مناسبتك الخاصة.',
}

function TemplateSelector({ selected, onSelect }) {
  const allOptions = [...templates, CUSTOM_OPTION]
  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-text font-arabic mb-1.5">اختر نوع دعوتك</h2>
        <p className="text-text-muted font-arabic text-sm font-light">اختر القالب الذي يناسب مناسبتك</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {allOptions.map((t) => (
          <motion.button
            key={t.id}
            onClick={() => onSelect(t.id)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-5 rounded-3xl border-2 text-right transition-all duration-300 ${
              selected === t.id
                ? 'border-primary bg-primary/5 shadow-luxury'
                : 'border-border bg-card hover:border-primary/40 hover:shadow-card'
            }`}
          >
            {selected === t.id && (
              <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check size={13} className="text-white" />
              </div>
            )}
            <div className="text-3xl mb-2.5">{t.icon}</div>
            <h3 className="font-semibold text-text text-base font-arabic mb-1.5">{t.name}</h3>
            <p className="text-text-muted text-xs leading-relaxed font-arabic font-light">{t.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function SuccessScreen({ templateId, formData }) {
  const template = getTemplateById(templateId) || CUSTOM_OPTION
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="text-center py-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.15, stiffness: 220 }}
        className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-5 shadow-luxury-lg"
      >
        <Check size={34} className="text-white" strokeWidth={2.5} />
      </motion.div>

      <h2 className="text-2xl font-bold text-text font-arabic mb-2">تم توجيهك لواتساب 🎉</h2>
      <p className="text-text-muted font-arabic mb-1.5 leading-relaxed max-w-xs mx-auto text-sm font-light">
        تم فتح واتساب برسالة تحتوي جميع بيانات طلبك. أرسلها وسنتواصل معك قريبًا.
      </p>
      <p className="text-text-muted/60 font-arabic text-xs mb-7 font-light">
        إذا لم يفتح واتساب تلقائيًا، اضغط على الزر أدناه
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(templateId, formData))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-white font-semibold px-7 py-3 rounded-full shadow-luxury font-arabic text-sm"
        >
          فتح واتساب
        </a>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 border-2 border-border text-text-muted font-medium px-7 py-3 rounded-full hover:border-primary hover:text-primary transition-all duration-300 font-arabic text-sm"
        >
          العودة للرئيسية
        </Link>
      </div>
    </motion.div>
  )
}

export default function OrderForm() {
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(0)
  const [templateId, setTemplateId] = useState(searchParams.get('template') || '')
  const [formData, setFormData] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const t = searchParams.get('template')
    if (t && (getTemplateById(t) || t === 'custom')) {
      setTemplateId(t)
      setStep(1)
    }
  }, [])

  const canProceed = () => {
    if (step === 0) return !!templateId
    if (step === 1) {
      if (templateId === 'wedding') {
        const cityOk = formData.city && (formData.city !== 'أخرى' || !!formData.customCity)
        const musicOk = (formData.musicChoice !== 'custom') || !!formData.musicUrl
        return !!(
          formData.groomName && formData.brideName &&
          formData.weddingDate &&
          formData.venueName && cityOk &&
          formData.receptionTime && formData.zaffaTime && formData.dinnerTime &&
          musicOk
        )
      }
      if (templateId === 'graduation') {
        const cityOk = formData.city && (formData.city !== 'أخرى' || !!formData.customCity)
        const musicOk = (formData.musicChoice !== 'custom') || !!formData.musicUrl
        return !!(formData.graduateName && formData.university && formData.major && formData.graduationYear && formData.eventDate && formData.eventTime && formData.venueName && cityOk && musicOk)
      }
      if (templateId === 'custom') {
        const musicOk = (formData.musicChoice !== 'custom') || !!formData.musicUrl
        return !!(formData.occasionType && formData.occasionName && formData.eventDate && formData.eventTime && formData.venueName && formData.contactPhone && formData.designIdea && musicOk)
      }
    }
    return true
  }

  const handleSubmit = () => {
    const msg = buildWhatsAppMessage(templateId, formData)
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-luxury pt-24 pb-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="bg-card rounded-3xl shadow-card border border-border/60 p-8">
            <SuccessScreen templateId={templateId} formData={formData} />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-luxury pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <Link
          to="/templates"
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-arabic text-sm mb-7"
        >
          <ArrowRight size={15} />
          العودة للقوالب
        </Link>

        {/* Progress */}
        <div className="flex items-center justify-center mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i < step
                      ? 'bg-gradient-gold text-white shadow-luxury'
                      : i === step
                      ? 'bg-dark text-white'
                      : 'bg-border text-text-muted'
                  }`}
                >
                  {i < step ? <Check size={14} strokeWidth={3} /> : i + 1}
                </div>
                <span className={`text-[11px] font-arabic whitespace-nowrap ${i === step ? 'text-text font-semibold' : 'text-text-muted/60'}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-14 sm:w-20 mx-2 mb-5 transition-colors duration-500 ${i < step ? 'bg-primary' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-card rounded-3xl shadow-card border border-border/60 p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {step === 0 && <TemplateSelector key="t" selected={templateId} onSelect={setTemplateId} />}
            {step === 1 && templateId === 'wedding' && (
              <div key="w">
                <h2 className="text-lg font-bold text-text font-arabic mb-5">تفاصيل دعوة الزواج</h2>
                <WeddingForm data={formData} onChange={setFormData} />
              </div>
            )}
            {step === 1 && templateId === 'graduation' && (
              <div key="g">
                <h2 className="text-lg font-bold text-text font-arabic mb-5">تفاصيل دعوة التخرج</h2>
                <GraduationForm data={formData} onChange={setFormData} />
              </div>
            )}
            {step === 1 && templateId === 'custom' && (
              <div key="c">
                <h2 className="text-lg font-bold text-text font-arabic mb-5">تفاصيل التصميم المخصص</h2>
                <CustomForm data={formData} onChange={setFormData} />
              </div>
            )}
            {step === 2 && (
              <div key="r">
                <h2 className="text-lg font-bold text-text font-arabic mb-5">مراجعة الطلب</h2>
                <OrderReview templateId={templateId} formData={formData} onEdit={() => setStep(1)} />
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-text-muted hover:text-text disabled:opacity-30 transition-colors font-arabic font-medium text-sm"
          >
            <ArrowRight size={16} />
            السابق
          </button>

          {step < 2 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="inline-flex items-center gap-2 bg-gradient-gold text-white font-semibold px-7 py-3 rounded-full shadow-luxury hover:shadow-luxury-lg hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-not-allowed transition-all duration-300 font-arabic text-sm"
            >
              التالي
              <ArrowLeft size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 bg-gradient-gold text-white font-semibold px-7 py-3 rounded-full shadow-luxury hover:shadow-luxury-lg hover:-translate-y-0.5 transition-all duration-300 font-arabic text-sm"
            >
              إرسال عبر واتساب
              <Send size={15} />
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
