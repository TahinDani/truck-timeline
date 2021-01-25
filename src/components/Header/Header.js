import './Header.css'

function Header({onFilterChange}) {
  return (
    <div className="Header">
      <div className="logo">truck-timeline</div>
      <div className="truck-filter">
        <div className="filter-label">Search truck:</div>
        <input type="text" placeholder="Search" onChange={(e) => onFilterChange(e)} />
      </div>
    </div>
  )
}

export default Header
