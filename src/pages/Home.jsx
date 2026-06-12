import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGames } from '../hooks/useGames'
import GameCard from '../components/GameCard'

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('search') || ''
  const [search, setSearch] = useState(query)

  useEffect(() => {
    setSearch(query)
  }, [query])

  const { games, loading, error } = useGames(query)

  const handleSearch = (e) => {
    e.preventDefault()
    if (search) {
      setSearchParams({ search })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status">Something went wrong.</p>}

      <div className="game-grid">
        {games && games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}

export default Home