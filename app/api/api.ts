import mockData from "../data/mock-data.json"

const USE_MOCK = false
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

export const api = {
  login: async (username: string, password: string) => {
    if (USE_MOCK) {
      return mockData.auth
    }
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    if (!response.ok) throw new Error("Identifiants incorrects")
    return response.json()
  },

  getUserInfo: async (token: string) => {
    if (USE_MOCK) {
      return mockData.userInfo
    }
    const response = await fetch(`${API_URL}/api/user-info`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
    if (!response.ok) throw new Error("Impossible de récupérer les infos du user")
    return response.json()
  },

  getUserActivity: async (token: string, startWeek: string, endWeek: string) => {
    if (USE_MOCK) {
      return mockData.userActivity
    }
    const response = await fetch(
      `${API_URL}/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`,
      { headers: { "Authorization": `Bearer ${token}` } }
    )
    if (!response.ok) throw new Error("Impossible de récupérer les activités du user")
    return response.json()
  }
}
