interface StatCardProps {
  label: string
  value: string | number
  unit: string
  icon?: React.ReactNode
}

export default function StatCard({ label, value, unit, icon }: StatCardProps) {
  return (
    <div className="rounded-card p-6 flex flex-col text-white relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0B23F4 0%, #3B5BDB 100%)" }}>
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-6 translate-x-6" />
      {label && <span className="text-small opacity-70 mb-2">{label}</span>}
      <div className="flex items-center gap-4">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <div>
          <span className="text-heading-3 font-semibold">{value}</span>
          <span className="text-body ml-1 opacity-70">{unit}</span>
        </div>
      </div>
    </div>
  )
}
