interface ButtonProps {
  label: string
  onClick?: () => void
  type?: "button" | "submit"
  isLoading?: boolean
}

export default function Button({ label, onClick, type = "button", isLoading }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className="w-full text-white text-body mt-6 py-4 px-10 rounded-button font-medium hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:scale-100"
      style={{ background: "linear-gradient(135deg, #0B23F4 0%, #3B5BDB 100%)" }}
    >
      {isLoading ? "Chargement..." : label}
    </button>
  )
}
