export const templates = [
  {
    id: 'wedding',
    type: 'wedding',
    name: 'دعوة زواج',
    nameEn: 'Wedding Invitation',
    description:
      'دعوة رقمية تفاعلية بتصميم ناعم وفاخر، تعرض تفاصيل المناسبة وبرنامج الحفل والموقع بطريقة مميزة.',
    features: ['تفاصيل الحفل', 'موقع القاعة', 'برنامج الحفل', 'مشاركة سهلة'],
    price: '200 ريال',
    deliveryTime: '٢٤–٤٨ ساعة',
    icon: '💍',
    // الفيديوهات موجودة في public/ وتُخدَم كـ static assets
    videoMp4: '/video.w.mp4',   // MP4 أولاً — يعمل على Chrome/Firefox/Safari
    videoMov: '/video.w.mov',   // MOV كـ fallback — Safari فقط
    previewUrl: 'https://leqaa-8.github.io/abdulaziz-ameerah/',
  },
  {
    id: 'graduation',
    type: 'graduation',
    name: 'دعوة تخرج',
    nameEn: 'Graduation Invitation',
    description:
      'دعوة رقمية تفاعلية تحتفي بلحظة التخرج بتصميم أنيق وإمكانية إضافة جميع تفاصيل المناسبة.',
    features: ['معلومات التخرج', 'تفاصيل الحفل', 'رسالة شخصية', 'مشاركة سهلة'],
    price: '150 ريال',
    deliveryTime: '٢٤–٤٨ ساعة',
    icon: '🎓',
    videoMp4: '/video.g.mp4',
    videoMov: '/video.g.mov',
    previewUrl: 'https://leqaa-8.github.io/graduation/',
  },
]

export const getTemplateById = (id) => templates.find((t) => t.id === id)
