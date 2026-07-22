import FormField, { Input, SelectField, MusicCard, isValidUrl } from './FormField'

const EVENT_TIMES = [
  '5:00 مساءً','5:30 مساءً','6:00 مساءً','6:30 مساءً','7:00 مساءً',
  '7:30 مساءً','8:00 مساءً','8:30 مساءً','9:00 مساءً','9:30 مساءً',
  '10:00 مساءً','10:30 مساءً','11:00 مساءً',
]

export default function GraduationForm({ data, onChange }) {
  const handle = (e) => onChange({ ...data, [e.target.name]: e.target.value })

  const musicChoice = data.musicChoice || 'template'

  const handleMusicChoice = (choice) => {
    onChange({ ...data, musicChoice: choice, musicUrl: choice === 'template' ? '' : (data.musicUrl || '') })
  }

  const handleMusicUrl = (e) => {
    onChange({ ...data, musicUrl: e.target.value })
  }

  const musicUrlTouched = data.musicUrl !== undefined
  const urlInvalid = musicUrlTouched && data.musicUrl && !isValidUrl(data.musicUrl)

  return (
    <div className="space-y-4">
      <FormField label="اسم الخريج / الخريجة" required>
        <Input name="graduateName" placeholder="سارة محمد" value={data.graduateName || ''} onChange={handle} />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="الجامعة أو المدرسة" required>
          <Input name="university" placeholder="جامعة الملك سعود" value={data.university || ''} onChange={handle} />
        </FormField>
        <FormField label="التخصص أو المرحلة" required>
          <Input name="major" placeholder="إدارة الأعمال" value={data.major || ''} onChange={handle} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="سنة التخرج" required>
          <Input name="graduationYear" placeholder="2025" value={data.graduationYear || ''} onChange={handle} />
        </FormField>
        <FormField label="تاريخ حفل التخرج" required>
          <Input
            type="date"
            name="eventDate"
            value={data.eventDate || ''}
            onChange={handle}
            style={{ direction: 'ltr', textAlign: 'left' }}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="وقت الحفل" required>
          <SelectField
            name="eventTime"
            value={data.eventTime}
            onChange={handle}
            options={EVENT_TIMES}
            placeholder="اختر وقت الحفل"
          />
        </FormField>
        <FormField label="اسم المكان" required>
          <Input name="venueName" placeholder="قاعة الأفراح" value={data.venueName || ''} onChange={handle} />
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

      <FormField label="اسم الداعي" hint="الأسرة أو الوالدان — اختياري">
        <Input name="hostName" placeholder="أسرة الأحمد" value={data.hostName || ''} onChange={handle} />
      </FormField>

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
            description="سيتم استخدام الموسيقى الافتراضية الموجودة في قالب التخرج."
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
    </div>
  )
}
