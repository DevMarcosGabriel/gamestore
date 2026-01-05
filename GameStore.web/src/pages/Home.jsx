import { useEffect, useState } from 'react'
import api from '../api/api'
import GameCard from '../components/GameCard'
import GameFormModal from '../components/GameFormModal'
import EditGameModal from '../components/EditGameModal'

function Home() {
  const [games, setGames] = useState([])
  const [gameToEdit, setGameToEdit] = useState(null)

  const loadGames = () => {
    api.get('/games').then(res => setGames(res.data))
  }

  useEffect(() => {
    loadGames()
  }, [])

  return (
    <>
      <h4 className="mb-4">Jogos disponíveis</h4>

      {/* 🔥 GRID RESPONSIVO COM CARDS MAIORES */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {games.map(game => (
          <div className="col" key={game.id}>
            <GameCard
              game={game}
              onEdit={setGameToEdit}
            />
          </div>
        ))}
      </div>

      {/* Modal de criação */}
      <GameFormModal onGameCreated={loadGames} />

      {/* Modal de edição */}
      <EditGameModal
        game={gameToEdit}
        onSaved={() => {
          setGameToEdit(null)
          loadGames()
        }}
      />
    </>
  )
}

export default Home
