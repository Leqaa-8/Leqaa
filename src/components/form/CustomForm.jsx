import { useRef } from 'react'
import FormField, { Input, Textarea, SelectField, MusicCard, isValidUrl } from './FormField'

const OCCASION_TYPES = [
  'زواج', 'عقد قران', 'تخرج', 'استقبال مولود', 'تقاعد',
]

const EVENT_TIMES = [
  '4:00 مساءً','4:30 مساءً','5:00 مساءً','5:30 مساءً','6:00 مساءً',
  '6:30 مساءً','7:00 مساءً','7:30 مساءً','8:00 مساءً','8:30 مساءً',
  '9:00 مساءً','9:30 مساءً','10:00 مساءً','10:30 مساءً','11:00 مساءً',
]

export default function CustomForm({ data, onChange }) {
  const fileRef = useRef(null)
  const handle = (e) => onChange({ ...data, [e.target.name]: e.target.value })

  const musicChoice = data.musicChoice || 'template'

  const handleMusicChoice = (choice) => {
    onChange({ ...data, musicChoice: choice, musicUrl: choice === 'template' ? '' : (data.musicUrl || '') })
  }

  const handleMusicUrl = (e) => onChange({ ...data, musicUrl: e.target.value })

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (file) onChange({ ...data, inspirationFile: file.name, _inspirationFile: file })
  }

  const musicUrlTouched = data.musicUrl !== undefined
  const urlInvalid = musicUrlTouched && data.musicUrl && !isValidUrl(data.musicUrl)
  const inspUrlTouched = data.inspirationUrl !== undefined
  const inspUrlInvalid = inspUrlTouched && data.inspirationUrl && !isValidUrl(data.inspirationUrl)

  return (
    <div className="space-y-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="نوع المناسبة" required>
          <SelectField
            name="occasionType"
            value={data.occasionType}
            onChange={handle}
            options={OCCASION_TYPES}
            placeholder="اختر نوع المناسبة"
          />
        </FormField>
        <FormField label="اسم المناسبة أو صاحبها" required>
          <Input name="occasionName" placeholder="سارة ومحمد / سارة الأحمد" value={data.occasionName || ''} onChange={handle} />
        </FormField>
      </div>

      <FormField label="اسم الداعي" hint="اختياري — الأسرة أو الوالدان">
        <Input name="hostName" placeholder="أسرة الأحمد" value={data.hostName || ''} onChange={handle} />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="تاريخ المناسبة" required>
          <Input
            type="date"
            name="eventDate"
            value={data.eventDate || ''}
            onChange={handle}
            style={{ direction: 'ltr', textAlign: 'left' }}
          />
        </FormField>
        <FormField label="وقت المناسبة" required>
          <SelectField
            name="eventTime"
            value={data.eventTime}
            onChange={handle}
            options={EVENT_TIMES}
            placeholder="اختر الوقت"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="اسم المكان" required>
          <Input name="venueName" placeholder="قاعة الأفراح / قصر ..." value={data.venueName || ''} onChange={handle} />
        </FormField>
        <FormField label="رقم الجوال للتواصل" required>
          <Input
            name="contactPhone"
            placeholder="05XXXXXXXX"
            value={data.contactPhone || ''}
            onChange={handle}
            style={{ direction: 'ltr', textAlign: 'left' }}
          />
        </FormField>
      </div>

      <FormField label="رابط الموقع" hint="Google Maps أو أي رابط — اختياري">
        <Input
          name="locationUrl"
          placeholder="https://maps.google.com/..."
          value={data.locationUrl || ''}
          onChange={handle}
          style={{ direction: 'ltr', textAlign: 'left' }}
        />
      </FormField>

      {/* Music */}
      <div>
        <label className="text-sm font-medium text-text font-arabic block mb-3">
          اختيار الموسيقى <span className="text-primary mr-0.5">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <MusicCard
            chosen={musicChoice}
            value="template"
            onSelect={handleMusicChoice}
            label="بدون موسيقى / اختيار لاحق"
            description="سنتواصل معك لاحقًا لاختيار الموسيقى المناسبة."
          />
          <MusicCard
            chosen={musicChoice}
            value="custom"
            onSelect={handleMusicChoice}
            label="إضافة رابط موسيقى"
            description="أضف رابط الموسيقى التي ترغب بتشغيلها داخل الدعوة."
          />
        </div>
        {musicChoice === 'custom' && (
          <div className="mt-3">
            <FormField
              label="رابط الموسيقى"
              required
              error={urlInvalid ? 'يرجى إدخال رابط صحيح (YouTube، Google Drive، SoundCloud...)' : ''}
            >
              <Input
                name="musicUrl"
                placeholder="https://..."
                value={data.musicUrl || ''}
                onChange={handleMusicUrl}
                style={{ direction: 'ltr', textAlign: 'left' }}
              />
            </FormField>
          </div>
        )}
      </div>

      {/* Design idea */}
      <div className="bg-blush/30 rounded-2xl p-4 space-y-4">
        <h4 className="font-semibold text-text font-arabic text-sm">تفاصيل التصميم</h4>

        <FormField label="وصف التصميم المطلوب" required hint="كيف تتخيل دعوتك؟ الأسلوب، الجو العام، التفاصيل...">
          <Textarea
            name="designIdea"
            placeholder="أريد تصميم بألوان ذهبية وبيج، على شكل بطاقة أنيقة مع اسم العريسين بخط جميل..."
            value={data.designIdea || ''}
            onChange={handle}
            rows={4}
          />
        </FormField>

        <FormField label="الألوان المفضلة" hint="اختياري — مثال: ذهبي، أبيض، روز جولد">
          <Input name="preferredColors" placeholder="ذهبي وأبيض، أو أي تنسيق تفضله" value={data.preferredColors || ''} onChange={handle} />
        </FormField>

        <FormField
          label="رابط إلهام أو مرجع"
          hint="اختياري — Pinterest، Instagram، أو أي رابط"
          error={inspUrlInvalid ? 'يرجى إدخال رابط صحيح' : ''}
        >
          <Input
            name="inspirationUrl"
            placeholder="https://pinterest.com/..."
            value={data.inspirationUrl || ''}
            onChange={handle}
            style={{ direction: 'ltr', textAlign: 'left' }}
          />
        </FormField>

        <FormField label="صورة للإلهام" hint="اختياري — JPG أو PNG أو WEBP">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="luxury-input text-right cursor-pointer text-text-muted hover:text-text transition-colors flex-1 text-sm font-arabic"
            >
              {data.inspirationFile || 'اضغط لاختيار صورة...'}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFile}
              className="hidden"
            />
          </div>
        </FormField>
      </div>

      <FormField label="ملاحظات إضافية" hint="اختياري — أي تفاصيل أخرى تريد إضافتها">
        <Textarea
          name="additionalDetails"
          placeholder="أي تفاصيل إضافية..."
          value={data.additionalDetails || ''}
          onChange={handle}
          rows={3}
        />
      </FormField>
    </div>
  )
}
