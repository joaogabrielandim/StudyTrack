import { useState } from 'react'
import './App.css'
import Login from "./pages/login-page.jsx"
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/home-page.jsx"
import Task from "./pages/task-page.jsx"
import Planner from "./pages/planner-page.jsx" // Removido o "/src/" do caminho
import Modal from "./pages/scroolview.jsx" 
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route 
          path="/home" 
          element={<Home abrirModal={() => setIsModalOpen(true)} />} 
        />
        <Route path="/tarefas" element={<Task/>} />
        <Route path="/calendario" element={<Planner/>} />
      </Routes>

      {/* O Modal fica aqui no final para sobrepor as páginas */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </BrowserRouter>
  )
}

export default App