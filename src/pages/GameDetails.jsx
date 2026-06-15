import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const BASE_URL = 'https://api.rawg.io/api'

function GameDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = useState(null)
  const [screenshots, setScreenshots] = useState([])
  const [trailer, setTrailer] = useState(null)
  const [stores, setStores] = useState([])
  const [suggested, setSuggested] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      try {
        const gameRes = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`)
        const gameData = await gameRes.json()
        setGame(gameData)
        document.title = `${gameData.name} — Game Explorer`

        const genre = gameData.genres?.[0]?.slug || ''
        const randomPage = Math.floor(Math.random() * 5) + 1

        const [screenshotsRes, moviesRes, storesRes, suggestedRes] = await Promise.all([
          fetch(`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`),
          fetch(`${BASE_URL}/games/${id}/movies?key=${API_KEY}`),
          fetch(`${BASE_URL}/games/${id}/stores?key=${API_KEY}`),
          fetch(`${BASE_URL}/games?key=${API_KEY}&genres=${genre}&ordering=-rating&page_size=7&page=${randomPage}`),
        ])

        const safeJson = async (res) => {
          try { return await res.json() } catch { return { results: [] } }
        }

        const [screenshotsData, moviesData, storesData, suggestedData] = await Promise.all([
          safeJson(screenshotsRes),
          safeJson(moviesRes),
          safeJson(storesRes),
          safeJson(suggestedRes),
        ])

        setScreenshots(screenshotsData.results || [])
        setTrailer(moviesData.results?.[0] || null)
        setStores(storesData.results || [])
        setSuggested(
          (suggestedData.results || [])
            .filter(g => g.background_image && g.id !== parseInt(id))
            .slice(0, 6)
        )
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
    return () => { document.title = 'Game Explorer' }
  }, [id])

  if (loading) return <p className="status">Loading...</p>
  if (!game) return <p className="status">Game not found.</p>

  const storeNames = {
    1: 'Steam', 2: 'Xbox Store', 3: 'PlayStation Store',
    4: 'App Store', 5: 'GOG', 6: 'Nintendo Store',
    7: 'Xbox 360 Store', 8: 'Google Play', 9: 'itch.io',
    11: 'Epic Games',
  }

  return (
    <div className="details-page">
      <div
        className="details-bg"
        style={{ backgroundImage: `url(${game.background_image})` }}
      />

      <div className="details-container">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>

        <div className="details-hero">
          <div className="details-media">
            {trailer ? (
              <video
                className="details-video"
                controls
                poster={game.background_image}
              >
                <source src={trailer.data?.max || trailer.data?.[480]} type="video/mp4" />
              </video>
            ) : (
              <img
                src={game.background_image}
                alt={game.name}
                className="details-video"
              />
            )}
          </div>

          <div className="details-info">
            <h1 className="details-title">{game.name}</h1>

            <div className="details-badges">
              <span className="badge badge-rating">★ {game.rating}</span>
              {game.metacritic && (
                <span className="badge badge-metacritic">Metacritic Score: {game.metacritic}</span>
              )}
              {game.playtime > 0 && (
                <span className="badge badge-playtime">Average Playtime: {game.playtime} hours</span>
              )}
            </div>

            <p className="details-released">Released: {game.released}</p>

            {game.developers?.length > 0 && (
              <p className="details-dev">
                by {game.developers.map(d => d.name).join(', ')}
              </p>
            )}

            <div className="details-genres">
              {game.genres?.map(g => (
                <span key={g.id} className="genre-tag">{g.name}</span>
              ))}
            </div>

            <div className="details-platforms">
              {game.parent_platforms?.map(p => (
                <span key={p.platform.id} className="platform-tag">{p.platform.name}</span>
              ))}
            </div>

            {stores.length > 0 && (
              <div className="details-stores">
                <p className="details-section-label">Available on</p>
                <div className="stores-list">
                  {stores.map(s => (
                    <a
                      key={s.id}
                      href={s.url?.startsWith('http') ? s.url : `https://${s.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="store-btn"
                    >
                      {storeNames[s.store_id] || 'Store'}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {game.description_raw && (
          <div className="details-description-section">
            <h2 className="details-section-title">About</h2>
            <p className="details-description">
              {game.description_raw.slice(0, 800)}{game.description_raw.length > 800 ? '...' : ''}
            </p>
          </div>
        )}

        {screenshots.length > 0 && (
          <div className="details-screenshots-section">
            <h2 className="details-section-title">Screenshots</h2>
            <div className="screenshots-grid">
              {screenshots.slice(0, 6).map(s => (
                <img key={s.id} src={s.image} alt="screenshot" className="screenshot-img" />
              ))}
            </div>
          </div>
        )}

        {suggested.length > 0 && (
          <div className="details-suggested-section">
            <h2 className="details-section-title">You Might Also Like</h2>
            <div className="suggested-row">
              {suggested.map(g => (
                <div
                  key={g.id}
                  className="suggested-card"
                  onClick={() => navigate(`/game/${g.id}`)}
                >
                  <img src={g.background_image} alt={g.name} className="suggested-img" />
                  <div className="suggested-overlay">
                    <p className="suggested-title">{g.name}</p>
                    <p className="suggested-rating">★ {g.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameDetails