import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const BASE_URL = 'https://api.rawg.io/api'

function GameDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`)
      const data = await res.json()
      setGame(data)
      setLoading(false)
      document.title = `${data.name} — Game Explorer`
    }
    fetchGame()

    return () => {
      document.title = 'Game Explorer'
    }
  }, [id])

  if (loading) return <p className="status">Loading...</p>

  return (
    <div className="details">
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      <div className="details-hero">
        <img src={game.background_image} alt={game.name} className="details-img" />
        <div className="details-info">
          <h1 className="details-title">{game.name}</h1>
          <p className="details-meta"><span>★ {game.rating}</span> &nbsp;|&nbsp; Released: {game.released}</p>
          <div className="details-genres">
            {game.genres.map(g => (
              <span key={g.id} className="genre-tag">{g.name}</span>
            ))}
          </div>
          <div className="details-platforms">
            {game.platforms.map(p => (
              <span key={p.platform.id} className="platform-tag">{p.platform.name}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="details-description">{game.description_raw}</p>
    </div>
  )
}

export default GameDetails