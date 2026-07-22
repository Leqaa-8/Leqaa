import { motion } from 'framer-motion'
import { CheckCircle, Edit3 } from 'lucide-react'
import { getTemplateById } from '../../data/templates'

const CUSTOM_META = { icon: '✨', name: 'تصميم مخصص', deliveryTime: '٤٨–٧٢ ساعة' }

function formatArabicDate(dateStr) {
  if (!dateStr) return ''
  try {
    return new Intl.DateTimeFormat('ar-SA', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    }).format(new Date(dateStr + 'T12:00:00'))
  } catch {
    return dateStr
  }
}

function ReviewRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/40 last:border-0">
      <span className="text-text-muted text-xs font-arabic min-w-[140px] flex-shrink-0 mt-0.5">{label}</span>
      <span className="text-text text-sm font-medium font-arabic break-words flex-1">{value}</span>
    </div>
  )
}

function WeddingReview({ data }) {
  const city = data.city === 'أخرى' ? (data.customCity || '') : data.city
  const musicLabel = data.musicChoice === 'custom' ? 'رابط موسيقى مخصص' : 'موسيقى القالب'

  return (
    <>
      <ReviewRow label="اسم العريس"            value={data.groomName} />
      <ReviewRow label="اسم العروس"            value={data.brideName} />
      <ReviewRow label="اسم الداعي"            value={data.hostName} />
      <ReviewRow label="تاريخ الحفل"           value={formatArabicDate(data.weddingDate)} />
      <ReviewRow label="وقت الحفل"             value={data.weddingTime} />
      <ReviewRow label="اسم القاعة أو المكان"  value={data.venueName} />
      <ReviewRow label="المدينة"               value={city} />
      <ReviewRow label="رابط الموقع"           value={data.locationUrl} />
      <ReviewRow label="وقت استقبال الضيوف"   value={data.receptionTime} />
      <ReviewRow label="وقت الزفة"             value={data.zaffaTime} />
      <ReviewRow label="وقت العشاء"            value={data.dinnerTime} />
      <ReviewRow label="الموسيقى"              value={musicLabel} />
      {data.musicChoice === 'custom' && (
        <ReviewRow label="رابط الموسيقى" value={data.musicUrl} />
      )}
    </>
  )
}

function GraduationReview({ data }) {
  const musicLabel = data.musicChoice === 'custom' ? 'رابط موسيقى مخصص' : 'موسيقى القالب'

  return (
    <>
      <ReviewRow label="اسم الخريج / الخريجة" value={data.graduateName} />
      <ReviewRow label="الجامعة أو المدرسة"    value={data.university} />
      <ReviewRow label="التخصص أو المرحلة"     value={data.major} />
      <ReviewRow label="سنة التخرج"            value={data.graduationYear} />
      <ReviewRow label="تاريخ الحفل"           value={data.eventDate} />
      <ReviewRow label="وقت الحفل"             value={data.eventTime} />
      <ReviewRow label="اسم المكان"            value={data.venueName} />
      <ReviewRow label="رابط الموقع"           value={data.locationUrl} />
      <ReviewRow label="اسم الداعي"            value={data.hostName} />
      <ReviewRow label="الموسيقى"              value={musicLabel} />
      {data.musicChoice === 'custom' && (
        <ReviewRow label="رابط الموسيقى" value={data.musicUrl} />
      )}
    </>
  )
}

function CustomReview({ data }) {
  const musicLabel = data.musicChoice === 'custom' ? 'رابط موسيقى مخصص' : 'بدون موسيقى / اختيار لاحق'
  return (
    <>
      <ReviewRow label="نوع المناسبة"           value={data.occasionType} />
      <ReviewRow label="اسم المناسبة / صاحبها"  value={data.occasionName} />
      <ReviewRow label="اسم الداعي"             value={data.hostName} />
      <ReviewRow label="تاريخ المناسبة"         value={data.eventDate} />
      <ReviewRow label="وقت المناسبة"           value={data.eventTime} />
      <ReviewRow label="اسم المكان"             value={data.venueName} />
      <ReviewRow label="رابط الموقع"            value={data.locationUrl} />
      <ReviewRow label="الموسيقى"               value={musicLabel} />
      {data.musicChoice === 'custom' && (
        <ReviewRow label="رابط الموسيقى" value={data.musicUrl} />
      )}
      <ReviewRow label="وصف التصميم"            value={data.designIdea} />
      <ReviewRow label="الألوان المفضلة"        value={data.preferredColors} />
      <ReviewRow label="رابط إلهام"             value={data.inspirationUrl} />
      <ReviewRow label="صورة إلهام"             value={data.inspirationFile} />
      <ReviewRow label="ملاحظات إضافية"         value={data.additionalDetails} />
      <ReviewRow label="رقم الجوال"             value={data.contactPhone} />
    </>
  )
}

export default function OrderReview({ templateId, formData, onEdit }) {
  const template = getTemplateById(templateId) || CUSTOM_META

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* Template header */}
      <div className="p-5 rounded-2xl bg-blush/40 border border-border/60 flex items-center gap-3">
        <span className="text-3xl">{template?.icon}</span>
        <div>
          <div className="font-semibold text-text font-arabic">{template?.name}</div>
          <div className="text-text-muted text-xs font-arabic mt-0.5">وقت التنفيذ: {template?.deliveryTime}</div>
        </div>
      </div>

      {/* Data */}
      <div className="bg-card rounded-2xl p-5 border border-border/60 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-text font-arabic text-sm">بيانات الطلب</h3>
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 text-primary text-xs font-semibold hover:text-primary-dark transition-colors font-arabic"
          >
            <Edit3 size={13} />
            تعديل
          </button>
        </div>

        <div>
          {templateId === 'wedding' ? (
            <WeddingReview data={formData} />
          ) : templateId === 'graduation' ? (
            <GraduationReview data={formData} />
          ) : (
            <CustomReview data={formData} />
          )}
        </div>
      </div>

      {/* Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-start gap-3">
        <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-text text-sm font-arabic mb-0.5">ماذا يحدث بعد الإرسال؟</p>
          <p className="text-text-muted text-xs font-arabic leading-relaxed font-light">
            سيتم فتح واتساب تلقائيًا برسالة تحتوي جميع بياناتك، وسيتواصل معك فريقنا للتأكيد وإتمام الطلب خلال{' '}
            <strong className="text-text">٢٤–٤٨ ساعة</strong>.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
