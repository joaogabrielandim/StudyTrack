import { useState, useEffect } from 'react'
import './App.css'
import Login from "./pages/login-page.jsx"
import Home from "./pages/home-page.jsx"
import Task from "./pages/task-page.jsx"
import Modal from "./pages/scroolview.jsx"
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from 'react-auth-verification-context'
import CalendarChecklist from "./pages/planner-page.jsx";

function AppNavigation() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessoes, setSessoes] = useState([]);
  const [recarregarStats, setRecarregarStats] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleAdicionarSessao = (novaSessao) => {
    setSessoes((prev) => [novaSessao, ...prev]);
    setRecarregarStats(prev => prev + 1); // dispara recarregamento dos cartões
  };

  const handleDeletarSessao = (id) => {
    setSessoes((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <Home
              abrirModal={() => setIsModalOpen(true)}
              sessoes={sessoes}
              onDeletar={handleDeletarSessao}
              recarregarStats={recarregarStats}
            />
          }
        />
        <Route path="/tarefas" element={<Task />} />
        <Route path="/calendario" element={<CalendarChecklist />} />
      </Routes>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdicionarSessao={handleAdicionarSessao}
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

export default App;