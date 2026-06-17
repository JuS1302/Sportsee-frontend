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
      <div className="w-1/2 flex flex-col">
        <Header>
          <Logo />
        </Header>
        <div className="flex-1 flex items-center justify-start px-50">
          <Card className="w-[400px]">
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
              <Button
                label="Se connecter"
                type="submit"
                isLoading={isLoading}
              />
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

      {/* Partie droite */}
      <div className="relative overflow-hidden">
        <img
          src="/images/running.jpg"
          alt="Coureurs"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-8 right-8 bg-white rounded-4xl p-4 max-w-[300px] shadow text-primary text-small text-center">
          Analysez vos performances en un clin d'œil, suivez vos progrès et atteignez vos objectifs.
        </div>
      </div>

    </div>
  )
}
