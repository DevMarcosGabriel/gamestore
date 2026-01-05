import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminGames from './pages/AdminGames'
import EditGame from './pages/EditGame'
import Navbar from './components/Navbar'
import GameDetails from './pages/GameDetails'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="container-fluid px-4 py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/games" element={<AdminGames />} />
          <Route path="/admin/games/new" element={<EditGame />} />
          <Route path="/admin/games/edit/:id" element={<EditGame />} />
          <Route path="/games/:id" element={<GameDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
