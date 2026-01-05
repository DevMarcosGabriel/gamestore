import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm">
      <div className="container-fluid px-4">
        <span
          className="navbar-brand fw-bold"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          🎮 Game Store
        </span>

        <button
          className="btn btn-outline-light btn-sm"
          onClick={() => navigate('/admin/games')}
        >
          Admin
        </button>
      </div>
    </nav>
  )
}

export default Navbar
