interface PeriodSelectorProps {
  label: string
  onPrev: () => void
  onNext: () => void
  canGoPrev: boolean
  canGoNext: boolean
}

export default function PeriodSelector({ label, onPrev, onNext, canGoPrev, canGoNext }: PeriodSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        className="w-7 h-7 rounded-full border border-border flex items-center justify-center disabled:opacity-30 hover:bg-gray-50"
      >
        <i className="fa-solid fa-chevron-left text-small text-text-dark" />
      </button>
      <span className="text-small text-text-light whitespace-nowrap">{label}</span>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="w-7 h-7 rounded-full border border-border flex items-center justify-center disabled:opacity-30 hover:bg-gray-50"
      >
        <i className="fa-solid fa-chevron-right text-small text-text-dark" />
      </button>
    </div>
  )
}
