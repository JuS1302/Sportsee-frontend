interface InputProps {
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ label, type = "text", value, onChange }: InputProps) {
  return (
    <div className="mb-5">
      <label className="text-small text-text-light mb-1.5 block font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-border rounded-input px-4 py-3 text-body focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all duration-150 bg-gray-50 focus:bg-white"
      />
    </div>
  )
}
