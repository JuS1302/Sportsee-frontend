export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md px-header py-navbar flex items-center justify-between border-b border-white/40 shadow-sm">
      {children}
    </header>
  )
}
