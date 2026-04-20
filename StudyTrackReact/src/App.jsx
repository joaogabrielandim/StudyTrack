import './App.css'
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/home-page.jsx"
import Task from "./pages/task-page.jsx"
import Planner from "./pages/planner-page.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/tarefas" element={<Task/>} />
        <Route path="/calendario" element={<Planner/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
