import { useState, useEffect } from 'react'
import './App.css'
import Login from "./pages/login-page.jsx"
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/home-page.jsx"
import Task from "./pages/task-page.jsx"
import Modal from "./pages/scroolview.jsx"
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from 'react-auth-verification-context'
import CalendarChecklist from "./pages/planner-page.jsx";


function AppNavigation() {
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={<Home abrirModal={() => setIsModalOpen(true)} />}
        />
        <Route path="/tarefas" element={<Task />} />
        <Route path="/calendario" element={<CalendarChecklist />} />
      </Routes>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App