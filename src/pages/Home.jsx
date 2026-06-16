import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGames } from '../hooks/useGames'
import GameCard from '../components/GameCard'
import SkeletonCard from '../components/SkeletonCard'
import Sidebar from '../components/Sidebar'

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('search') || ''
  const ordering = searchParams.get('ordering') || '-rating'
  const minRating = parseFloat(searchParams.get('minRating') || '0')
  const genres = searchParams.get('genres') ? searchParams.get('genres').split(',') : []
  const platforms = searchParams.get('platforms') ? searchParams.get('platforms').split(',') : []

  const [search, setSearch] = useState(query)

  useEffect(() => {
    document.title = 'Game Explorer'
  }, [])

  useEffect(() => {
    setSearch(query)
  }, [query])

  const { games, loading, error } = useGames(query, genres, ordering, platforms, minRating)

  const handleSearch = (e) => {
    e.preventDefault()
    const params = buildParams({ search, genres, ordering, platforms, minRating })
    setSearchParams(params)
  }

  const handleClear = () => {
    setSearch('')
    const params = buildParams({ search: '', genres, ordering, platforms, minRating })
    setSearchParams(params)
  }

  const handleFilters = ({ genres: g, ordering: o, platforms: p, minRating: r }) => {
    const params = buildParams({ search: query, genres: g, ordering: o, platforms: p, minRating: r })
    setSearchParams(params)
  }

  return (
    <div className="home-layout">
      <Sidebar
        genres={genres}
        ordering={ordering}
        platforms={platforms}
        minRating={minRating}
        onChange={handleFilters}
      />

      <div className="home-content">
        <form onSubmit={handleSearch} className="search-bar">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <button type="button" className="clear-btn" onClick={handleClear}>✕</button>
            )}
            <button type="submit" className="search-btn-inside">Search</button>
          </div>
        </form>

        <p className="grid-count">{!loading && `${games?.length || 0} games`}</p>

        {loading && (
          <div className="game-grid">
            {[...Array(24)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && error && <p className="status">Something went wrong.</p>}

        {!loading && !error && games?.length === 0 && (
          <p className="status">
            {query ? `No results found for "${query}"` : 'No games found. Try adjusting your filters.'}
          </p>
        )}

        {!loading && (
          <div className="game-grid">
            {games && games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function buildParams({ search, genres, ordering, platforms, minRating }) {
  const params = {}
  if (search) params.search = search
  if (genres.length) params.genres = genres.join(',')
  if (ordering) params.ordering = ordering
  if (platforms.length) params.platforms = platforms.join(',')
  if (minRating > 0) params.minRating = minRating
  return params
}

export default Home