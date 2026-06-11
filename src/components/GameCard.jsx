import { Link } from 'react-router-dom'

function GameCard({ game }) {
  return (
    <Link to={`/game/${game.id}`} className="game-card">
      <img
        src={game.background_image}
        alt={game.name}
        className="game-card-img"
      />
      <div className="game-card-info">
        <h3 className="game-card-title">{game.name}</h3>
        <span className="game-card-rating">⭐ {game.rating}</span>
      </div>
    </Link>
  )
}

export default GameCard