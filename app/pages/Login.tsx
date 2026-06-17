import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import Logo from "../components/Logo"
import Header from "../components/Header"
import Input from "../components/Input"
import Button from "../components/Button"
import Card from "../components/Card"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { handleLogin, error, isLoading } = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) return
    handleLogin(username, password)
  }

  const handleDemo = () => {
    handleLogin("julie", "password123")
  }

  return (
    <div className="flex h-screen bg-background">

      {/* Partie gauche */}
      <div className="w-1/2 flex flex-col animate-fade-in">
        <Header>
          <Logo />
        </Header>
        <div className="flex-1 flex items-center justify-center px-16">
          <Card className="w-full max-w-md">
            <h1 className="text-primary text-heading-3 font-semibold leading-tight mb-8">
              Transformez <br /> vos stats en résultats
            </h1>
            <h2 className="text-heading-4 font-medium mb-6">
              Se connecter
            </h2>
            <form onSubmit={handleSubmit}>
              <Input
                label="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                label="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <p className="text-red-500 text-small mb-4">{error}</p>
              )}
            </form>
            <Button
              label="Voir la démo"
              type="button"
              onClick={handleDemo}
              isLoading={isLoading}
            />
          </Card>
        </div>
      </div>

      {/* Partie droite - photo plein écran */}
      <div className="flex-1 relative overflow-hidden">
        <img
          src="/images/running.jpg"
          alt="Coureurs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <p className="text-white text-body-large font-medium">
            Analysez vos performances en un clin d'œil, suivez vos progrès et atteignez vos objectifs.
          </p>
        </div>
      </div>

    </div>
  )
}
