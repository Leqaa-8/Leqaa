import FormField, { Input, SelectField, MusicCard, isValidUrl } from './FormField'

const TODAY = new Date().toISOString().split('T')[0]

const RECEPTION_TIMES = [
  '5:00 مساءً','5:30 مساءً','6:00 مساءً','6:30 مساءً','7:00 مساءً',
  '7:30 مساءً','8:00 مساءً','8:30 مساءً','9:00 مساءً','9:30 مساءً','10:00 مساءً',
]

const ZAFFA_TIMES = [
  '10:00 مساءً','10:30 مساءً','11:00 مساءً','11:30 مساءً',
  '12:00 صباحًا','12:30 صباحًا','1:00 صباحًا','1:30 صباحًا',
  '2:00 صباحًا','2:30 صباحًا','3:00 صباحًا',
]

const DINNER_TIMES = [
  '8:00 مساءً','8:30 مساءً','9:00 مساءً','9:30 مساءً','10:00 مساءً',
  '10:30 مساءً','11:00 مساءً','11:30 مساءً',
  '12:00 صباحًا','12:30 صباحًا','1:00 صباحًا','1:30 صباحًا',
  '2:00 صباحًا','2:30 صباحًا','3:00 صباحًا',
]

const CITIES = [
  'الرياض','جدة','مكة المكرمة','المدينة المنورة',
  'الطائف','الدمام','الخبر','أخرى',
]


export default function WeddingForm({ data, onChange, errors = {} }) {
  const handle = (e) => onChange({ ...data, [e.target.name]: e.target.value })

  const handleMusicChoice = (choice) => {
    onChange({ ...data, musicChoice: choice, musicUrl: choice === 'template' ? '' : (data.musicUrl || '') })
  }

  const handleMusicUrl = (e) => {
    onChange({ ...data, musicUrl: e.target.value })
  }

  const musicChoice = data.musicChoice || 'template'
  const showCustomCity = data.city === 'أخرى'
  const musicUrlTouched = data.musicUrl !== undefined
  const urlInvalid = musicUrlTouched && data.musicUrl && !isValidUrl(data.musicUrl)

  return (
    <div className="space-y-4">

      {/* ── Names ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="اسم العريس" required error={errors.groomName}>
          <Input name="groomName" placeholder="محمد" value={data.groomName || ''} onChange={handle} />
        </FormField>
        <FormField label="اسم العروس" required error={errors.brideName}>
          <Input name="brideName" placeholder="نورة" value={data.brideName || ''} onChange={handle} />
        </FormField>
      </div>

      <FormField label="اسم الداعي" hint="اختياري — يُعرض في مقدمة الدعوة">
        <Input name="hostName" placeholder="عائلة العريس" value={data.hostName || ''} onChange={handle} />
      </FormField>

      {/* ── Date ── */}
      <FormField label="تاريخ الحفل" required error={errors.weddingDate}>
        <input
          type="date"
          name="weddingDate"
          value={data.weddingDate || ''}
          onChange={handle}
          min={TODAY}
          className="luxury-input"
          style={{ direction: 'ltr', textAlign: 'left' }}
        />
      </FormField>

      {/* ── Venue & City ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="اسم القاعة أو المكان" required error={errors.venueName}>
          <Input name="venueName" placeholder="قصر الأفراح" value={data.venueName || ''} onChange={handle} />
        </FormField>
        <FormField label="المدينة" required error={errors.city}>
          <SelectField
            name="city"
            value={data.city}
            onChange={handle}
            options={CITIES}
            placeholder="اختر المدينة"
          />
        </FormField>
      </div>

      {showCustomCity && (
        <FormField label="اسم المدينة" required>
          <Input name="customCity" placeholder="اكتب اسم المدينة" value={data.customCity || ''} onChange={handle} />
        </FormField>
      )}

      {/* ── Location URL ── */}
      <FormField label="رابط الموقع" hint="Google Maps أو أي رابط — اختياري">
        <Input
          name="locationUrl"
          placeholder="https://maps.google.com/..."
          value={data.locationUrl || ''}
          onChange={handle}
          style={{ direction: 'ltr', textAlign: 'left' }}
        />
      </FormField>

      {/* ── Program ── */}
      <div className="bg-blush/30 rounded-2xl p-4 space-y-4">
        <h4 className="font-semibold text-text font-arabic text-sm">برنامج الحفل</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField label="وقت استقبال الضيوف" required error={errors.receptionTime}>
            <SelectField
              name="receptionTime"
              value={data.receptionTime}
              onChange={handle}
              options={RECEPTION_TIMES}
              placeholder="اختر وقت الاستقبال"
            />
          </FormField>
          <FormField label="وقت الزفة" required error={errors.zaffaTime}>
            <SelectField
              name="zaffaTime"
              value={data.zaffaTime}
              onChange={handle}
              options={ZAFFA_TIMES}
              placeholder="اختر وقت الزفة"
            />
          </FormField>
          <FormField label="وقت العشاء" required error={errors.dinnerTime}>
            <SelectField
              name="dinnerTime"
              value={data.dinnerTime}
              onChange={handle}
              options={DINNER_TIMES}
              placeholder="اختر وقت العشاء"
            />
          </FormField>
        </div>
      </div>

      {/* ── Music Selection ── */}
      <div>
        <label className="text-sm font-medium text-text font-arabic block mb-3">
          اختيار الموسيقى <span className="text-primary mr-0.5">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <MusicCard
            chosen={musicChoice}
            value="template"
            onSelect={handleMusicChoice}
            label="استخدام موسيقى القالب"
            description="سيتم استخدام الموسيقى الموجودة في القالب المختار."
          />
          <MusicCard
            chosen={musicChoice}
            value="custom"
            onSelect={handleMusicChoice}
            label="إضافة رابط موسيقى"
            description="أضف رابط الموسيقى التي ترغب باستخدامها."
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
    </div>
  )
}
