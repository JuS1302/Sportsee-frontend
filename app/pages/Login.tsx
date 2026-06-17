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
        <div className="px-16 pt-12">
          <Logo />
          <p className="text-text-light text-body-large mt-4">
            Analysez vos performances, suivez vos progrès et atteignez vos objectifs.
          </p>
        </div>
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
      </div>

    </div>
  )
}
