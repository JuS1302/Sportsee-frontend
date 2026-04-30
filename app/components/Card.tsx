interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-(--radius-card) p-8 shadow-sm ${className}`}>
      {children}
    </div>
  )
}
