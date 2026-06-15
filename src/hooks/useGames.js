import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const BASE_URL = 'https://api.rawg.io/api'

export function useGames(search = '', genres = [], ordering = '-rating', platforms = [], minRating = 0) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true)
      try {
        let url = `${BASE_URL}/games?key=${API_KEY}&page_size=28&ordering=${ordering}`
        if (search) url += `&search=${search}`
        if (genres.length) url += `&genres=${genres.join(',')}`
        if (platforms.length) url += `&parent_platforms=${platforms.join(',')}`

        const res = await fetch(url)
        const data = await res.json()
        let filtered = data.results.filter(g => g.background_image)

        if (minRating > 0) filtered = filtered.filter(g => g.rating >= minRating)

        if (genres.length > 1) {
          filtered = filtered.filter(g =>
            genres.every(genre => g.genres.some(gg => gg.slug === genre))
          )
        }

        if (platforms.length > 1) {
          filtered = filtered.filter(g =>
            platforms.every(pid => g.parent_platforms?.some(pp => String(pp.platform.id) === pid))
          )
        }

        setGames(filtered)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [search, genres.join(','), ordering, platforms.join(','), minRating])

  return { games, loading, error }
}