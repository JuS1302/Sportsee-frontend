import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import PeriodSelector from "../PeriodSelector"

interface WeeklyDistanceItem {
  weekKey: string
  startDate: string
  endDate: string
  distance: number
}

interface WeeklyDistanceChartProps {
  weeklyDistance: WeeklyDistanceItem[]
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })

const CustomLegend = () => (
  <div className="flex items-center gap-2 mt-2">
    <div className="w-2 h-2 rounded-full bg-chart-bar-dot"></div>
    <span className="text-text-light text-small">Km</span>
  </div>
)

export default function WeeklyDistanceChart({ weeklyDistance }: WeeklyDistanceChartProps) {
  const [pageStart, setPageStart] = useState(Math.max(0, weeklyDistance.length - 4))

  const visible = weeklyDistance.slice(pageStart, pageStart + 4).map((w, i) => ({
    ...w,
    week: `S${i + 1}`
  }))

  const avg = visible.length > 0
    ? Math.round(visible.reduce((sum, w) => sum + w.distance, 0) / visible.length)
    : 0

  const periodLabel = visible.length > 0
    ? `${formatDate(visible[0].startDate)} - ${formatDate(visible[visible.length - 1].endDate)}`
    : ''

  return (
    <div>
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-primary text-heading-4">{avg} km en moyenne</h3>
        <PeriodSelector
          label={periodLabel}
          onPrev={() => setPageStart(p => Math.max(0, p - 1))}
          onNext={() => setPageStart(p => p + 1)}
          canGoPrev={pageStart > 0}
          canGoNext={pageStart + 4 < weeklyDistance.length}
        />
      </div>
      <p className="text-text-light text-body mb-4">Total des kilomètres 4 dernières semaines</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={visible} barSize={14} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="var(--color-chart-grid)" />
          <XAxis dataKey="week" axisLine={{ stroke: "var(--color-chart-axis)" }} tickLine={false} tick={{ fill: "var(--color-text-light)", fontSize: 12 }} />
          <YAxis axisLine={{ stroke: "var(--color-chart-axis)" }} tickLine={false} tick={{ fill: "var(--color-text-light)", fontSize: 12 }} />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar dataKey="distance" fill="var(--color-chart-bar)" radius={[7, 7, 7, 7]} activeBar={{ fill: "var(--color-primary)" }} />
        </BarChart>
      </ResponsiveContainer>
      <CustomLegend />
    </div>
  )
}
