import { NavLink, useNavigate } from "react-router"
import Logo from "./Logo"
import Header from "./Header"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-body pb-0.5 transition-colors duration-150 ${
      isActive
        ? "text-primary font-medium border-b-2 border-primary"
        : "text-text-dark hover:text-primary"
    }`

  return (
    <Header>
      <Logo />
      <div className="flex items-center gap-8 bg-white/90 rounded-full px-8 py-3 shadow-sm backdrop-blur-sm">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/profile" className={linkClass}>
          Mon profil
        </NavLink>
        <span className="text-border">|</span>
        <button onClick={handleLogout} className="text-primary text-body hover:underline transition-opacity hover:opacity-70">
          Se déconnecter
        </button>
      </div>
    </Header>
  )
}
