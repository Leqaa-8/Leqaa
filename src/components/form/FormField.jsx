export default function FormField({ label, required, error, children, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text font-arabic">
          {label}
          {required && <span className="text-primary mr-0.5">*</span>}
        </label>
      )}
      {children}
      {hint && <p className="text-xs text-text-muted/70 font-arabic font-light">{hint}</p>}
      {error && <p className="text-xs text-rose-500 font-arabic">{error}</p>}
    </div>
  )
}

export function Input({ id, name, type = 'text', placeholder, value, onChange, required, disabled, ...rest }) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      {...rest}
      className="luxury-input"
    />
  )
}

export function Textarea({ id, name, placeholder, value, onChange, rows = 3 }) {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className="luxury-input resize-none"
    />
  )
}

export function isValidUrl(str) {
  if (!str) return false
  try { new URL(str); return true } catch { return false }
}

export function MusicCard({ chosen, value, onSelect, label, description }) {
  const selected = chosen === value
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`w-full text-right p-4 rounded-2xl border-2 transition-all duration-200 ${
        selected
          ? 'border-primary bg-primary/[0.06]'
          : 'border-border bg-card hover:border-primary/40'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center transition-colors duration-200 ${
            selected ? 'border-primary' : 'border-border-dark'
          }`}
        >
          {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
        </div>
        <div className="flex-1">
          <div className={`text-sm font-semibold font-arabic transition-colors ${selected ? 'text-primary' : 'text-text'}`}>
            {label}
          </div>
          <div className="text-xs text-text-muted font-arabic font-light mt-0.5 leading-relaxed">
            {description}
          </div>
        </div>
      </div>
    </button>
  )
}

export function SelectField({ name, value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value || ''}
        onChange={onChange}
        className="luxury-input appearance-none cursor-pointer"
        style={{ paddingLeft: '2.25rem', direction: 'rtl' }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted/60">
        <svg width="11" height="6" viewBox="0 0 11 6" fill="none" aria-hidden="true">
          <path d="M1 1L5.5 5.5L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}
