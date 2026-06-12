function GenreList({ selected, onSelect }) {
  const genres = [
    { id: 'action', name: 'Action' },
    { id: 'role-playing-games-rpg', name: 'RPG' },
    { id: 'shooter', name: 'Shooter' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'strategy', name: 'Strategy' },
    { id: 'puzzle', name: 'Puzzle' },
    { id: 'racing', name: 'Racing' },
    { id: 'sports', name: 'Sports' },
  ]

  return (
    <div className="genre-list">
      {genres.map(g => (
        <button
          key={g.id}
          className={`genre-btn ${selected === g.id ? 'active' : ''}`}
          onClick={() => onSelect(selected === g.id ? '' : g.id)}
        >
          {g.name}
        </button>
      ))}
    </div>
  )
}

export default GenreList