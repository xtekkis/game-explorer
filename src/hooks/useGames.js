import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const BASE_URL = 'https://api.rawg.io/api'

export function useGames(search = '', genres = [], ordering = '-rating', platforms = [], minRating = 0) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    setPage(1)
    setGames([])
  }, [search, genres.join(','), ordering, platforms.join(','), minRating])

  useEffect(() => {
    const fetchGames = async () => {
      if (page === 1) setLoading(true)
      else setLoadingMore(true)

      try {
        let url = `${BASE_URL}/games?key=${API_KEY}&page_size=28&ordering=${ordering}&page=${page}`
        if (search) url += `&search=${search}`
        if (genres.length) url += `&genres=${genres.join(',')}`
        if (platforms.length) url += `&parent_platforms=${platforms.join(',')}`

        const res = await fetch(url)
        const data = await res.json()
        const filtered = data.results.filter(g => g.background_image)

        if (minRating > 0) {
          const rated = filtered.filter(g => g.rating >= minRating)
          setGames(prev => page === 1 ? rated : [...prev, ...rated])
        } else {
          setGames(prev => page === 1 ? filtered : [...prev, ...filtered])
        }

        setHasMore(!!data.next)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    }

    fetchGames()
  }, [search, genres.join(','), ordering, platforms.join(','), minRating, page])

  const loadMore = () => setPage(prev => prev + 1)

  return { games, loading, error, hasMore, loadingMore, loadMore }
}