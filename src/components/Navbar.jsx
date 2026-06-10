import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Game Explorer</Link>
    </nav>
  )
}

export default Navbar