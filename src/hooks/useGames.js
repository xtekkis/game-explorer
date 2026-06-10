import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const BASE_URL = 'https://api.rawg.io/api'

export function useGames(search = '', genre = '') {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true)
      try {
        let url = `${BASE_URL}/games?key=${API_KEY}&page_size=20`
        if (search) url += `&search=${search}`
        if (genre) url += `&genres=${genre}`

        const res = await fetch(url)
        const data = await res.json()
        setGames(data.results)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [search, genre])

  return { games, loading, error }
}