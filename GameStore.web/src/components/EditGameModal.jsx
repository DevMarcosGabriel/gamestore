import { useEffect, useState } from 'react'
import api from '../api/api'

function EditGameModal({ game, onSaved }) {
  const [nome, setNome] = useState('')
  const [generoId, setGeneroId] = useState('')
  const [preco, setPreco] = useState('')
  const [dataLancamento, setDataLancamento] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [generos, setGeneros] = useState([])

  useEffect(() => {
    api.get('/generos').then(res => setGeneros(res.data))
  }, [])

  useEffect(() => {
    if (!game) return

    setNome(game.nome)
    setGeneroId(game.generoId.toString())
    setPreco(game.preco)
    setImageUrl(game.imageUrl)
    setDataLancamento(game.dataLancamento.substring(0, 10))
  }, [game])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await api.put(`/games/${game.id}`, {
      nome,
      generoid: Number(generoId),
      preco: Number(preco),
      dataLancamento,
      imageUrl
    })

    onSaved()
  }

  if (!game) return null

  return (
    <div className="modal fade" id="editGameModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Editar Jogo</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input className="form-control" value={nome}
                  onChange={e => setNome(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Gênero</label>
                <select className="form-select" value={generoId}
                  onChange={e => setGeneroId(e.target.value)} required>
                  {generos.map(g => (
                    <option key={g.id} value={g.id}>{g.nome}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Preço</label>
                <input type="number" step="0.01" className="form-control"
                  value={preco} onChange={e => setPreco(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Data de lançamento</label>
                <input type="date" className="form-control"
                  value={dataLancamento}
                  onChange={e => setDataLancamento(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Imagem (URL)</label>
                <input className="form-control"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)} required />
              </div>

            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button className="btn btn-primary">
                Salvar alterações
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default EditGameModal
