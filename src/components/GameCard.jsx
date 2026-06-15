import { Link } from 'react-router-dom'
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid, FaGamepad } from 'react-icons/fa'

const platformIcon = (name) => {
  if (name.includes('PC')) return <FaWindows />
  if (name.includes('PlayStation')) return <FaPlaystation />
  if (name.includes('Xbox')) return <FaXbox />
  if (name.includes('macOS') || name.includes('Apple') || name.includes('iOS')) return <FaApple />
  if (name.includes('Linux')) return <FaLinux />
  if (name.includes('Android')) return <FaAndroid />
  if (name.includes('Nintendo') || name.includes('Switch') || name.includes('Wii') || name.includes('DS') || name.includes('Game Boy')) return <FaGamepad />
  if (name.includes('Atari') || name.includes('Sega') || name.includes('Vita') || name.includes('PSP')) return <FaGamepad />
  return <FaGamepad />
}

function GameCard({ game }) {
  const icons = game.platforms
    ?.map(p => platformIcon(p.platform.name))
    .filter(Boolean)

  return (
    <Link to={`/game/${game.id}`} className="game-card">
      <div className="game-card-img-wrapper">
        <img
          src={game.background_image}
          alt={game.name}
          className="game-card-img"
        />
        <div className="game-card-overlay">
          <span className="game-card-title">{game.name}</span>
          <span className="game-card-rating">★ {game.rating}</span>
        </div>
      </div>
      <div className="game-card-platforms">
        {icons?.map((icon, i) => (
          <span key={i} className="platform-icon">{icon}</span>
        ))}
      </div>
    </Link>
  )
}

export default GameCard