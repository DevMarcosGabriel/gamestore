import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/api'

function GameDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = useState(null)

  useEffect(() => {
    api.get(`/games/${id}`)
      .then(res => setGame(res.data))
      .catch(() => navigate('/'))
  }, [id])

  if (!game) {
    return <p>Carregando...</p>
  }

  return (
    <div className="container mt-4">
      <button
        className="btn btn-sm btn-outline-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Voltar
      </button>

      <div className="row g-4">
        {/* IMAGEM */}
        <div className="col-md-5">
          <img
            src={game.imageUrl}
            alt={game.nome}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </div>

        {/* INFORMAÇÕES */}
        <div className="col-md-7">
          <h2 className="fw-bold">{game.nome}</h2>

          <p className="text-muted mb-2">
            Gênero: <strong>{game.genero}</strong>
          </p>

          <p className="fs-4 fw-bold text-success">
            R$ {game.preco}
          </p>

          <p className="text-muted">
            Data de lançamento: {game.dataLancamento}
          </p>
        </div>
      </div>
    </div>
  )
}

export default GameDetails
