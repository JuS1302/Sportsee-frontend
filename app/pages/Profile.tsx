import ProtectedRoute from "../components/ProtectedRoute"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Card from "../components/Card"
import StatCard from "~/components/StatCard"
import { useUserData } from "../hooks/useUserData"

export default function Profile() {
  const { userInfo, userActivity, isLoading, error } = useUserData()

  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center">Chargement...</div>
  if (error || !userInfo) return <div className="min-h-screen bg-background flex items-center justify-center">Erreur de chargement</div>

  const { profile, statistics } = userInfo

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 px-page py-14">
          <div className="grid grid-cols-[9fr_11fr] gap-12">

            {/* Colonne gauche */}
            <div className="flex flex-col gap-6">
              <Card className="flex items-center gap-8">
                <img
                  src={profile.profilePicture}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  className="w-[104px] h-[117px] rounded-[10px] object-cover"
                />
                <div>
                  <p className="text-heading-4">{profile.firstName} {profile.lastName}</p>
                  <p className="text-text-light text-body">Membre depuis le {profile.memberSince}</p>
                </div>
              </Card>

              <Card>
                <h2 className="text-heading-4 mb-4">Votre profil</h2>
                <hr className="border-border mb-6" />
                <ul className="flex flex-col gap-4 text-body text-text-light">
                  <li>Âge : {profile.age}</li>
                  <li>Genre : {profile.genderLabel}</li>
                  <li>Taille : {profile.heightLabel}</li>
                  <li>Poids : {profile.weight}kg</li>
                </ul>
              </Card>
            </div>

            {/* Colonne droite */}
            <div>
              <h2 className="text-heading-4 mb-1">Vos statistiques</h2>
              <p className="text-text-light text-body mb-6">depuis le {profile.memberSince}</p>
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  label="Temps total couru"
                  value={`${statistics.totalHours}h`}
                  unit={`${statistics.totalMinutes}min`}
                />
                <StatCard
                  label="Calories brûlées"
                  value={userActivity?.totalCalories ?? "—"}
                  unit="cal"
                />
                <StatCard
                  label="Distance totale parcourue"
                  value={statistics.totalDistance}
                  unit="km"
                />
                <StatCard
                  label="Nombre de jours de repos"
                  value={userActivity?.restDays ?? "—"}
                  unit="jours"
                />
                <StatCard
                  label="Nombre de sessions"
                  value={statistics.totalSessions}
                  unit="sessions"
                />
              </div>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
