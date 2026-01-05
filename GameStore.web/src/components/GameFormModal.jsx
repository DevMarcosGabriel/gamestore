import { useEffect, useState } from 'react'
import api from '../api/api'

function GameFormModal({ onGameCreated }) {
  const [nome, setNome] = useState('')
  const [generoId, setGeneroId] = useState('')
  const [preco, setPreco] = useState('')
  const [dataLancamento, setDataLancamento] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [generos, setGeneros] = useState([])

  // 🔹 Carregar gêneros da API
  useEffect(() => {
    api.get('/generos')
      .then(res => setGeneros(res.data))
      .catch(err => console.error(err))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const novoJogo = {
      nome,
      generoid: Number(generoId),
      preco: Number(preco),
      dataLancamento,
      imageUrl
    }

    await api.post('/games', novoJogo)

    // Limpar formulário
    setNome('')
    setGeneroId('')
    setPreco('')
    setDataLancamento('')
    setImageUrl('')

    onGameCreated()
  }

  return (
    <div className="modal fade" id="gameModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Novo Jogo</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              {/* Nome */}
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                  className="form-control"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  required
                />
              </div>

              {/* Gênero */}
              <div className="mb-3">
                <label className="form-label">Gênero</label>
                <select
                  className="form-select"
                  value={generoId}
                  onChange={e => setGeneroId(e.target.value)}
                  required
                >
                  <option value="">Selecione um gênero</option>
                  {generos.map(g => (
                    <option key={g.id} value={g.id}>
                      {g.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preço */}
              <div className="mb-3">
                <label className="form-label">Preço</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={preco}
                  onChange={e => setPreco(e.target.value)}
                  required
                />
              </div>

              {/* Data de lançamento */}
              <div className="mb-3">
                <label className="form-label">Data de lançamento</label>
                <input
                  type="date"
                  className="form-control"
                  value={dataLancamento}
                  onChange={e => setDataLancamento(e.target.value)}
                  required
                />
              </div>

              {/* Imagem */}
              <div className="mb-3">
                <label className="form-label">URL da imagem</label>
                <input
                  className="form-control"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  required
                />
              </div>

            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>

              <button type="submit" className="btn btn-primary">
                Salvar
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default GameFormModal
