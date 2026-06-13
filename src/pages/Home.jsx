import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGames } from '../hooks/useGames'
import GameCard from '../components/GameCard'
import GenreList from '../components/GenreList'
import SkeletonCard from '../components/SkeletonCard'

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('search') || ''
  const genre = searchParams.get('genre') || ''
  const [search, setSearch] = useState(query)

  useEffect(() => {
    setSearch(query)
  }, [query])

  const { games, loading, error } = useGames(query, genre)

  const handleSearch = (e) => {
    e.preventDefault()
    const params = {}
    if (search) params.search = search
    if (genre) params.genre = genre
    setSearchParams(params)
  }

  const handleGenre = (g) => {
    const params = {}
    if (query) params.search = query
    if (g) params.genre = g
    setSearchParams(params)
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

      <GenreList selected={genre} onSelect={handleGenre} />

      {loading && (
        <div className="game-grid">
          {[...Array(20)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {!loading && error && <p className="status">Something went wrong.</p>}

      {!loading && (
        <div className="game-grid">
          {games && games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home