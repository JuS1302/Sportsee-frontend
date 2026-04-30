import ProtectedRoute from "../components/ProtectedRoute"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Card from "../components/Card"
import StatCard from "~/components/StatCard"
import WeeklyDistanceChart from "../components/charts/WeeklyDistanceChart"
import HeartRateChart from "../components/charts/HeartRateChart"
import WeeklyGoalChart from "../components/charts/WeeklyGoalChart"
import { useUserData } from "../hooks/useUserData"

export default function Dashboard() {
  const { userInfo, userActivity, isLoading, error } = useUserData()

  if (isLoading) return <p className="p-10">Chargement...</p>
  if (error) return <p className="p-10 text-red-500">{error}</p>

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 px-page py-14">

          {/* Carte profil */}
          {userInfo && (
            <Card className="flex items-center justify-between mb-20">
              <div className="flex items-center gap-8">
                <img
                  src={userInfo.profile.profilePicture}
                  alt={`${userInfo.profile.firstName} ${userInfo.profile.lastName}`}
                  className="w-[104px] h-[117px] rounded-[10px] object-cover"
                />
                <div>
                  <p className="text-heading-4">
                    {userInfo.profile.firstName} {userInfo.profile.lastName}
                  </p>
                  <p className="text-text-light text-body">
                    Membre depuis le {new Date(userInfo.profile.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric", month: "long", year: "numeric"
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-text-light text-body">Distance totale parcourue</p>
                <StatCard
                  label=""
                  value={userInfo.statistics.totalDistance}
                  unit="km"
                  icon={<i className="fa-solid fa-trophy text-heading-3 text-white" />}
                />
              </div>
            </Card>
          )}

          {/* Section Dernières performance */}
          <h2 className="text-heading-4 mb-6">Vos dernières performances</h2>
          <div className="grid grid-cols-[9fr_11fr] gap-6">
            <Card>
              <WeeklyDistanceChart weeklyDistance={userActivity.weeklyDistance} />
            </Card>
            <Card>
              <HeartRateChart sessions={userActivity.sessions} />
            </Card>
          </div>

          {/* Section Cette semaine */}
          {userActivity.weeklyStats && userInfo && (
            <section className="mt-12">
              <h2 className="text-heading-4">Cette semaine</h2>
              <p className="text-text-light text-body-large mb-6">
                Du {new Date(userActivity.weeklyStats.weekStart).toLocaleDateString('fr-FR')} au {new Date(userActivity.weeklyStats.weekEnd).toLocaleDateString('fr-FR')}
              </p>
              <div className="grid grid-cols-[9fr_11fr] gap-6">
                <Card>
                  <WeeklyGoalChart
                    sessionCount={userActivity.weeklyStats.sessionCount}
                    weeklyGoal={userInfo.profile.weeklyGoal}
                  />
                </Card>
                <div className="flex flex-col gap-6">
                  <Card>
                    <p className="text-text-light text-body mb-2">Durée d'activité</p>
                    <p className="text-heading-3 font-semibold">
                      <span className="text-primary">{userActivity.weeklyStats.totalDuration}</span>
                      <span className="text-chart-bar text-body font-normal ml-1">minutes</span>
                    </p>
                  </Card>
                  <Card>
                    <p className="text-text-light text-body mb-2">Distance</p>
                    <p className="text-heading-3 font-semibold">
                      <span className="text-chart-max-bpm">{userActivity.weeklyStats.totalDistance}</span>
                      <span className="text-chart-min-bpm text-body font-normal ml-1">kilomètres</span>
                    </p>
                  </Card>
                </div>
              </div>
            </section>
          )}

        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
