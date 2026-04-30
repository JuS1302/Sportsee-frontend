import { useState } from "react"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import PeriodSelector from "../PeriodSelector"

interface Session {
  date: string
  heartRate: {
    min: number
    max: number
    average: number
  }
}

interface HeartRateChartProps {
  sessions: Session[]
}

const DAY_ORDER = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

const getISOWeek = (date: Date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
  const week1 = new Date(d.getFullYear(), 0, 4)
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}

const getWeekBounds = (weekKey: string) => {
  const [yearStr, weekStr] = weekKey.split('-W')
  const year = parseInt(yearStr)
  const week = parseInt(weekStr)
  const jan4 = new Date(year, 0, 4)
  const jan4DayOfWeek = (jan4.getDay() + 6) % 7
  const monday = new Date(jan4)
  monday.setDate(jan4.getDate() - jan4DayOfWeek + (week - 1) * 7)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  return { start: monday, end: sunday }
}

const getDayName = (dateStr: string) => {
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
  return days[new Date(dateStr).getDay()]
}

const formatDate = (date: Date) =>
  date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })

const CustomLegend = () => (
  <div className="flex items-center gap-2 mt-2">
    <div className="w-2 h-2 rounded-full bg-chart-min-bpm"></div>
    <span className="text-text-light text-small">Min</span>
    <div className="w-2 h-2 rounded-full bg-chart-max-bpm"></div>
    <span className="text-text-light text-small">Max</span>
    <div className="w-2 h-2 rounded-full bg-chart-avg-bpm"></div>
    <span className="text-text-light text-small">Avg BPM</span>
  </div>
)

export default function HeartRateChart({ sessions }: HeartRateChartProps) {
  const sessionsByWeek: { [key: string]: Session[] } = {}
  sessions.forEach(session => {
    const date = new Date(session.date)
    const key = `${date.getFullYear()}-W${String(getISOWeek(date)).padStart(2, '0')}`
    if (!sessionsByWeek[key]) sessionsByWeek[key] = []
    sessionsByWeek[key].push(session)
  })

  const weekKeys = Object.keys(sessionsByWeek).sort()
  const [weekIndex, setWeekIndex] = useState(Math.max(0, weekKeys.length - 1))

  const currentSessions = sessionsByWeek[weekKeys[weekIndex]] || []

  const dayMap: { [day: string]: { min: number[], max: number[], average: number[] } } = {}
  currentSessions.forEach(session => {
    const day = getDayName(session.date)
    if (!dayMap[day]) dayMap[day] = { min: [], max: [], average: [] }
    dayMap[day].min.push(session.heartRate.min)
    dayMap[day].max.push(session.heartRate.max)
    dayMap[day].average.push(session.heartRate.average)
  })

  const data = DAY_ORDER.map(day => ({
    day,
    min: dayMap[day] ? Math.round(dayMap[day].min.reduce((a, b) => a + b) / dayMap[day].min.length) : null,
    max: dayMap[day] ? Math.round(dayMap[day].max.reduce((a, b) => a + b) / dayMap[day].max.length) : null,
    average: dayMap[day] ? Math.round(dayMap[day].average.reduce((a, b) => a + b) / dayMap[day].average.length) : null,
  }))

  const validDays = data.filter(d => d.average !== null)
  const avgBpm = validDays.length > 0
    ? Math.round(validDays.reduce((sum, d) => sum + (d.average || 0), 0) / validDays.length)
    : 0

  const { start, end } = getWeekBounds(weekKeys[weekIndex])
  const periodLabel = `${formatDate(start)} - ${formatDate(end)}`

  return (
    <div>
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-chart-max-bpm text-heading-4">{avgBpm} BPM</h3>
        <PeriodSelector
          label={periodLabel}
          onPrev={() => setWeekIndex(i => i - 1)}
          onNext={() => setWeekIndex(i => i + 1)}
          canGoPrev={weekIndex > 0}
          canGoNext={weekIndex < weekKeys.length - 1}
        />
      </div>
      <p className="text-text-light text-body mb-4">Fréquence cardiaque moyenne</p>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} barSize={14}>
          <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="var(--color-chart-grid)" />
          <XAxis dataKey="day" axisLine={{ stroke: "var(--color-chart-axis)" }} tickLine={false} tick={{ fill: "var(--color-text-light)", fontSize: 12 }} />
          <YAxis axisLine={{ stroke: "var(--color-chart-axis)" }} tickLine={false} tick={{ fill: "var(--color-text-light)", fontSize: 12 }} domain={[130, 190]} ticks={[130, 145, 160, 187]} />
          <Tooltip />
          <Bar dataKey="max" name="Max BPM" fill="var(--color-chart-max-bpm)" radius={[7, 7, 7, 7]} />
          <Bar dataKey="min" name="Min" fill="var(--color-chart-min-bpm)" radius={[7, 7, 7, 7]} />
          <Line dataKey="average" name="Avg BPM" stroke="var(--color-chart-avg-bpm)" dot={{ fill: "var(--color-chart-avg-bpm)" }} type="monotone" />
        </ComposedChart>
      </ResponsiveContainer>
      <CustomLegend />
    </div>
  )
}
