import { useNavigate } from 'react-router-dom'

function GameCard({ game }) {
  const navigate = useNavigate()

  const image =
    game.imageUrl && game.imageUrl.trim() !== ''
      ? game.imageUrl
      : 'https://via.placeholder.com/600x400?text=Sem+Imagem'

  return (
    <div
      className="card h-100 shadow-sm border-0"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/games/${game.id}`)}
    >
      <img
        src={image}
        className="card-img-top"
        alt={game.nome}
        style={{ height: '700px', objectFit: 'cover' }}
      />

      <div className="card-body d-flex flex-column">
        <h6 className="fw-semibold text-truncate mb-1">
          {game.nome}
        </h6>

        <small className="text-muted mb-3">
          Gênero: {game.genero}
        </small>

        <div className="mt-auto">
          <span className="fw-bold text-success fs-5">
            R$ {game.preco}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GameCard
