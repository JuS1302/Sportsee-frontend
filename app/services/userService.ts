import { api } from "../api/api"

export type FormattedUserInfo = {
  profile: {
    firstName: string
    lastName: string
    profilePicture: string
    createdAt: string
    age: number
    weight: number
    weeklyGoal: number
    genderLabel: string
    heightLabel: string
    memberSince: string
  }
  statistics: {
    totalDistance: string
    totalSessions: number
    totalDuration: number
    totalHours: number
    totalMinutes: number
  }
}

// Calcule le numéro de semaine ISO (1 à 53) d'une date.
// Utilisé par getUserActivity pour regrouper les sessions par semaine.
const getISOWeek = (date: Date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
  const week1 = new Date(d.getFullYear(), 0, 4)
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}

// Convertit une Date en "YYYY-MM-DD" en heure locale.
// Évite le décalage d'un jour causé par toISOString() en France (UTC+1).
const toLocalDateStr = (d: Date) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// Retourne le lundi et le dimanche d'une semaine ISO.
// Ex : "2025-W51" → { startDate: "2025-12-15", endDate: "2025-12-21" }
// Utilisé pour construire weeklyDistance et weeklyStats dans getUserActivity.
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
  return {
    startDate: toLocalDateStr(monday),
    endDate: toLocalDateStr(sunday)
  }
}

export const userService = {
  // Appelle l'API pour récupérer le profil, puis ajoute des champs formatés prêts à afficher :
  // genderLabel ("Femme"/"Homme"), heightLabel ("1m65"), memberSince (date en français),
  // totalHours et totalMinutes (durée totale convertie depuis les minutes).
  // Résultat utilisé dans useUserData → Dashboard.tsx (carte profil) et Profile.tsx (profil + statistiques).
  getUserInfo: async (token: string): Promise<FormattedUserInfo> => {
    const info = await api.getUserInfo(token)
    const { profile, statistics } = info

    return {
      profile: {
        ...profile,
        genderLabel: profile.gender === "female" ? "Femme" : "Homme",
        heightLabel: `${Math.floor(profile.height / 100)}m${profile.height % 100}`,
        memberSince: new Date(profile.createdAt).toLocaleDateString("fr-FR", {
          day: "numeric", month: "long", year: "numeric"
        })
      },
      statistics: {
        ...statistics,
        totalHours: Math.floor(statistics.totalDuration / 60),
        totalMinutes: statistics.totalDuration % 60
      }
    }
  },

  // Appelle l'API pour récupérer les sessions entre deux dates, puis calcule :
  // - totalCalories : somme des calories de toutes les sessions
  // - restDays : nombre de jours sans course sur la période
  // - weeklyDistance : distance totale par semaine (pour le graphique WeeklyDistanceChart)
  // - weeklyStats : stats de la semaine la plus récente (sessionCount, totalDuration, totalDistance)
  // Résultat utilisé dans useUserData → Dashboard.tsx (graphiques + "Cette semaine") et Profile.tsx (statistiques).
  getUserActivity: async (token: string, startWeek: string, endWeek: string) => {
    const activity = await api.getUserActivity(token, startWeek, endWeek)

    const totalCalories = activity.reduce(
      (sum: number, session: any) => sum + session.caloriesBurned, 0
    )

    const start = new Date(startWeek)
    const end = new Date(endWeek)
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    const restDays = totalDays - activity.length

    const sorted = [...activity].sort((a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    const weeks: { [key: string]: number } = {}
    sorted.forEach((session: any) => {
      const date = new Date(session.date)
      const key = `${date.getFullYear()}-W${getISOWeek(date)}`
      weeks[key] = (weeks[key] || 0) + session.distance
    })

    const weeklyDistance = Object.entries(weeks)
      .reverse()
      .map(([key, distance]) => ({
        weekKey: key,
        ...getWeekBounds(key),
        distance: Math.round((distance as number) * 10) / 10
      }))

    const latestDate = sorted[0] ? new Date(sorted[0].date) : new Date()
    const latestWeekKey = `${latestDate.getFullYear()}-W${getISOWeek(latestDate)}`
    const latestWeekBounds = getWeekBounds(latestWeekKey)

    const currentWeekSessions = activity.filter((s: any) =>
      s.date >= latestWeekBounds.startDate && s.date <= latestWeekBounds.endDate
    )

    const weeklyStats = {
      weekStart: latestWeekBounds.startDate,
      weekEnd: latestWeekBounds.endDate,
      sessionCount: currentWeekSessions.length,
      totalDuration: currentWeekSessions.reduce((sum: number, s: any) => sum + s.duration, 0),
      totalDistance: Math.round(currentWeekSessions.reduce((sum: number, s: any) => sum + s.distance, 0) * 10) / 10
    }

    return {
      sessions: activity,
      totalCalories,
      restDays,
      weeklyDistance,
      weeklyStats
    }
  }
}
