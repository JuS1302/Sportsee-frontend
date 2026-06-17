interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-(--radius-card) p-8 shadow-[0_4px_24px_rgba(11,35,244,0.06)] border border-white hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(11,35,244,0.1)] transition-all duration-200 ${className}`}>
      {children}
    </div>
  )
}
