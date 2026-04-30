import IconLogo from "./IconLogo"
import Logo from "./Logo"

export default function Footer() {
  return (
    <footer className="bg-white px-header py-navbar flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-dark text-body">©Sportsee</span>
        <span className="text-dark text-body">Tous droits réservés</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-text-light text-body cursor-pointer hover:text-dark">Conditions générales</span>
        <span className="text-text-light text-body cursor-pointer hover:text-dark">Contact</span>
        <IconLogo />
      </div>
    </footer>
  )
}
