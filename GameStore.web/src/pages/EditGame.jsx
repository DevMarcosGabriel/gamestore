import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/api'

function EditGame() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [generoId, setGeneroId] = useState('')
  const [preco, setPreco] = useState('')
  const [dataLancamento, setDataLancamento] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [generos, setGeneros] = useState([])

  // 🔹 Carregar gêneros
  useEffect(() => {
    api.get('/generos').then(res => setGeneros(res.data))
  }, [])

  // 🔹 Carregar jogo por ID
  useEffect(() => {
    api.get(`/games/${id}`).then(res => {
      const game = res.data
      setNome(game.nome)
      setGeneroId(game.generoId)
      setPreco(game.preco)
      setDataLancamento(game.dataLancamento?.substring(0, 10))
      setImageUrl(game.imageUrl || '')
    })
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const jogoAtualizado = {
      nome,
      generoid: Number(generoId),
      preco: Number(preco),
      dataLancamento,
      imageUrl
    }

    await api.put(`/games/${id}`, jogoAtualizado)
    navigate('/admin/games')
  }

  return (
    <div className="container mt-4" style={{ maxWidth: 700 }}>
      <h4 className="mb-4">Editar Jogo</h4>

      <form onSubmit={handleSubmit} className="card shadow-sm p-4">

        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            className="form-control"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Gênero</label>
          <select
            className="form-select"
            value={generoId}
            onChange={e => setGeneroId(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            {generos.map(g => (
              <option key={g.id} value={g.id}>
                {g.nome}
              </option>
            ))}
          </select>
        </div>

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

        <div className="mb-3">
          <label className="form-label">Imagem (URL)</label>
          <input
            className="form-control"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
        </div>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="img-fluid rounded mb-3"
            style={{ maxHeight: 200, objectFit: 'cover' }}
          />
        )}

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/admin/games')}
          >
            Cancelar
          </button>

          <button type="submit" className="btn btn-primary">
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditGame
