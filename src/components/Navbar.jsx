import { Link } from 'react-router-dom'

function Navbar({ onBurgerClick, sidebarOpen }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Game Explorer</Link>
      <button
        className={`burger-btn ${sidebarOpen ? 'open' : ''}`}
        onClick={onBurgerClick}
        aria-label="Toggle filters"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  )
}

export default Navbar