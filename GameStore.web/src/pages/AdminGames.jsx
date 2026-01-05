import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import GameFormModal from '../components/GameFormModal'

function AdminGames() {
  const [games, setGames] = useState([])
  const navigate = useNavigate()

  const loadGames = () => {
    api.get('/games')
      .then(res => setGames(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    loadGames()
  }, [])

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir este jogo?'
    )

    if (!confirmed) return

    try {
      await api.delete(`/games/${id}`)
      loadGames()
    } catch (error) {
      alert('Erro ao excluir o jogo')
    }
  }

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Administração de Jogos</h4>

        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#gameModal"
        >
          + Novo Jogo
        </button>
      </div>

      {/* Tabela */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Nome</th>
              <th>Gênero</th>
              <th>Preço</th>
              <th>Data de Lançamento</th>
              <th className="text-end">Ações</th>
            </tr>
          </thead>

          <tbody>
            {games.map(game => (
              <tr key={game.id}>
                <td>{game.nome}</td>
                <td>{game.genero}</td>
                <td>R$ {game.preco}</td>
                <td>{game.dataLancamento}</td>

                <td className="text-end">
                  <div className="btn-group btn-group-sm">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() =>
                        navigate(`/admin/games/edit/${game.id}`)
                      }
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(game.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {games.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  Nenhum jogo cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <GameFormModal onGameCreated={loadGames} />

    </div>
  )
}

export default AdminGames
