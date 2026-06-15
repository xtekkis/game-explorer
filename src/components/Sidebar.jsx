function Sidebar({ genres, ordering, platforms, minRating, onChange }) {
  const genreOptions = [
    { id: 'action', name: 'Action' },
    { id: 'role-playing-games-rpg', name: 'RPG' },
    { id: 'shooter', name: 'Shooter' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'strategy', name: 'Strategy' },
    { id: 'puzzle', name: 'Puzzle' },
    { id: 'racing', name: 'Racing' },
    { id: 'sports', name: 'Sports' },
  ]

  const sortOptions = [
    { id: '-rating', name: 'Top Rated' },
    { id: '-released', name: 'Latest' },
    { id: '-metacritic', name: 'Metacritic' },
  ]

  const platformOptions = [
    { id: '1', name: 'PC' },
    { id: '2', name: 'PlayStation' },
    { id: '3', name: 'Xbox' },
    { id: '7', name: 'Nintendo' },
    { id: '4', name: 'iOS' },
    { id: '8', name: 'Android' },
  ]

  const toggleGenre = (id) => {
    const updated = genres.includes(id)
      ? genres.filter(g => g !== id)
      : [...genres, id]
    onChange({ genres: updated, ordering, platforms, minRating })
  }

  const togglePlatform = (id) => {
    const updated = platforms.includes(id)
      ? platforms.filter(p => p !== id)
      : [...platforms, id]
    onChange({ genres, ordering, platforms: updated, minRating })
  }

  const handleOrdering = (o) => {
    onChange({ genres, ordering: o, platforms, minRating })
  }

  const handleRating = (r) => {
    onChange({ genres, ordering, platforms, minRating: r })
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">Sort By</h3>
        {sortOptions.map(o => (
          <button
            key={o.id}
            className={`sidebar-option ${ordering === o.id ? 'active' : ''}`}
            onClick={() => handleOrdering(o.id)}
          >
            <span className={`sidebar-radio ${ordering === o.id ? 'active' : ''}`} />
            {o.name}
          </button>
        ))}
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Min Rating</h3>
        <span className="rating-value">{minRating > 0 ? `${minRating}+` : 'Any'}</span>
        <div className="rating-slider-wrap">
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={minRating}
            onChange={(e) => handleRating(parseFloat(e.target.value))}
            className="rating-slider"
          />
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Genre</h3>
        {genreOptions.map(g => (
          <button
            key={g.id}
            className={`sidebar-option ${genres.includes(g.id) ? 'active' : ''}`}
            onClick={() => toggleGenre(g.id)}
          >
            <span className={`sidebar-check ${genres.includes(g.id) ? 'active' : ''}`} />
            {g.name}
          </button>
        ))}
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Platform</h3>
        {platformOptions.map(p => (
          <button
            key={p.id}
            className={`sidebar-option ${platforms.includes(p.id) ? 'active' : ''}`}
            onClick={() => togglePlatform(p.id)}
          >
            <span className={`sidebar-check ${platforms.includes(p.id) ? 'active' : ''}`} />
            {p.name}
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar