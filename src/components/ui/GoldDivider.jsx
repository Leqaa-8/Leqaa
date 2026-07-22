export default function GoldDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-2 my-4 ${className}`}>
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
      <div className="h-px w-24 bg-gold/40" />
      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  )
}
