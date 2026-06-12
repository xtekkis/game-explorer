import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const BASE_URL = 'https://api.rawg.io/api'

export function useGenres() {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(`${BASE_URL}/genres?key=${API_KEY}`)
      const data = await res.json()
      setGenres(data.results)
    }
    fetchGenres()
  }, [])

  return { genres }
}