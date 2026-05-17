import { useState, useEffect } from 'react';
import './App.css';
import Login from "./pages/login-page.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/home-page.jsx";
import Task from "./pages/task-page.jsx";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import CalendarChecklist from "./pages/planner-page.jsx";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function AppNavigation() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // undefined = Firebase ainda carregando | null = deslogado | objeto = logado
  const [usuario, setUsuario] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUsuario(user ?? null);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (usuario === undefined) return; // aguarda Firebase confirmar estado
    if (usuario) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [usuario]);

  // Enquanto o Firebase verifica a sessão, não renderiza nada (evita flash branco)
  if (usuario === undefined) return null;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <Home
            abrirModal={() => setIsModalOpen(true)}
            isModalOpen={isModalOpen}
            fecharModal={() => setIsModalOpen(false)}
          />
        }
      />
      <Route path="/tarefas"    element={<Task />} />
      <Route path="/calendario" element={<CalendarChecklist />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppNavigation />
    </BrowserRouter>
  );
}

export default App;
