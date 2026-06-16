import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import GameDetails from './pages/GameDetails'
import Navbar from './components/Navbar'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    let resizeTimer
    const handleResize = () => {
      document.body.classList.add('resize-animation-stopper')
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper')
      }, 400)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <BrowserRouter>
      <Navbar
        onBurgerClick={() => setSidebarOpen(prev => !prev)}
        sidebarOpen={sidebarOpen}
      />
      <Routes>
        <Route path="/" element={<Home sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />} />
        <Route path="/game/:id" element={<GameDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App