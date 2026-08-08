import logo from '../../assets/logo.png'

export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="rounded-full overflow-hidden border flex-shrink-0"
        style={{
          width: 42,
          height: 42,
          borderColor: 'rgba(200,169,106,0.5)',
          boxShadow: '0 2px 12px rgba(200,169,106,0.25)',
        }}
      >
        <img
          src={logo}
          alt="شعار لقاء"
          className="w-full h-full object-cover"
          style={{ filter: 'sepia(0.3) saturate(0.8) brightness(1.05)' }}
        />
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span
          className="font-english font-semibold tracking-[0.3em] text-xs uppercase"
          style={{ color: '#C8A96A' }}
        >
          LEQAA
        </span>
        <span
          className="font-kufi font-light tracking-widest text-[10px]"
          style={{ color: 'rgba(200,169,106,0.8)' }}
        >
          لقاء
        </span>
      </div>
    </div>
  )
}
