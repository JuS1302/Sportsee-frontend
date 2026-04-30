import { PieChart, Pie, ResponsiveContainer } from "recharts"

interface WeeklyGoalChartProps {
  sessionCount: number
  weeklyGoal: number
}

const RADIAN = Math.PI / 180

const renderLabel = ({ cx, cy, midAngle, outerRadius, name, value, fill }: any) => {
  const labelRadius = outerRadius + 40
  const dotRadius = outerRadius + 18
  const x = cx + labelRadius * Math.cos(-midAngle * RADIAN)
  const y = cy + labelRadius * Math.sin(-midAngle * RADIAN)
  const dotX = cx + dotRadius * Math.cos(-midAngle * RADIAN)
  const dotY = cy + dotRadius * Math.sin(-midAngle * RADIAN)

  return (
    <g>
      <circle cx={dotX} cy={dotY} r={4} fill={fill} />
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fill="var(--color-text-light)"
      >
        {value} {name}
      </text>
    </g>
  )
}

export default function WeeklyGoalChart({ sessionCount, weeklyGoal }: WeeklyGoalChartProps) {
  const done = Math.min(sessionCount, weeklyGoal)
  const remaining = Math.max(0, weeklyGoal - sessionCount)

  const data = remaining > 0
    ? [
        { name: "réalisées", value: done, fill: "var(--color-primary)" },
        { name: "restants", value: remaining, fill: "var(--color-chart-goal-remaining)" },
      ]
    : [{ name: "réalisées", value: 1, fill: "var(--color-primary)" }]

  return (
    <div>
      <h3 className="text-heading-4 font-semibold">
        <span className="text-primary text-heading-3">x{sessionCount}</span>
        <span className="text-chart-bar text-body-large"> sur objectif de {weeklyGoal}</span>
      </h3>
      <p className="text-text-light text-body mb-4">Courses hebdomadaires réalisées</p>
      <ResponsiveContainer width="100%" height={260}>
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
            label={renderLabel}
            labelLine={false}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
