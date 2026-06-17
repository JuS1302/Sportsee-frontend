import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { userService } from "../services/userService"

export const useUserData = () => {
  const { token } = useAuth()
  const [userInfo, setUserInfo] = useState<any>(null)
  const [userActivity, setUserActivity] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [info, activity] = await Promise.all([
          userService.getUserInfo(token || ""),
          userService.getUserActivity(token || "", "2024-01-01", new Date().toISOString().split("T")[0])
        ])
        setUserInfo(info)
        setUserActivity(activity)
      } catch {
        setError("Erreur lors du chargement des données")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [token])

  return { userInfo, userActivity, isLoading, error }
}
