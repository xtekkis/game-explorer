function SortBar({ selected, onSelect }) {
  const options = [
    { id: '-rating', name: 'Top Rated' },
    { id: '-released', name: 'Latest' },
    { id: '-metacritic', name: 'Metacritic' },
  ]

  return (
    <div className="sort-bar">
      {options.map(o => (
        <button
          key={o.id}
          className={`sort-btn ${selected === o.id ? 'active' : ''}`}
          onClick={() => onSelect(o.id)}
        >
          {o.name}
        </button>
      ))}
    </div>
  )
}

export default SortBar