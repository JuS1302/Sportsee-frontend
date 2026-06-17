import { PieChart, Pie, ResponsiveContainer } from "recharts"

interface WeeklyGoalChartProps {
  sessionCount: number
  weeklyGoal: number
}

const CustomLegend = ({ done, remaining }: { done: number; remaining: number }) => (
  <div className="flex items-center gap-6 mt-2">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-primary" />
      <span className="text-text-light text-small">{done} réalisée{done > 1 ? "s" : ""}</span>
    </div>
    {remaining > 0 && (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-chart-goal-remaining" />
        <span className="text-text-light text-small">{remaining} restant{remaining > 1 ? "s" : ""}</span>
      </div>
    )}
  </div>
)

export default function WeeklyGoalChart({ sessionCount, weeklyGoal }: WeeklyGoalChartProps) {
  const done = Math.min(sessionCount, weeklyGoal)
  const remaining = Math.max(0, weeklyGoal - sessionCount)

  const data = [
    { name: "réalisées", value: done, fill: "var(--color-primary)" },
    ...(remaining > 0 ? [{ name: "restants", value: remaining, fill: "var(--color-chart-goal-remaining)" }] : [])
  ]

  return (
    <div>
      <h3 className="text-heading-4 font-semibold">
        <span className="text-primary text-heading-3">x{sessionCount}</span>
        <span className="text-chart-bar text-body-large"> sur objectif de {weeklyGoal}</span>
      </h3>
      <p className="text-text-light text-body mb-4">Courses hebdomadaires réalisées</p>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            strokeWidth={0}
            paddingAngle={remaining > 0 ? 4 : 0}
          />
        </PieChart>
      </ResponsiveContainer>
      <CustomLegend done={done} remaining={remaining} />
    </div>
  )
}
