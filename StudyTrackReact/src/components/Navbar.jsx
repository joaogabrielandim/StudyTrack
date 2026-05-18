import "./Navbar.css"
import homeicon from "../assets/homeicon.svg"
import taskicon from "../assets/taskicon.svg"
import calendaricon from "../assets/calendaricon.svg"
import logouticon from "../assets/user-logout.svg"
import { Link } from "react-router-dom"
import { useAuth } from "react-auth-verification-context"
import { useState, useEffect } from "react"
import { auth } from "../firebase"

function Navbar() {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe(); // limpa o listener ao desmontar
  }, []);

  const inicial = user?.displayName?.charAt(0) || user?.email?.charAt(0) || "?"

  return (
    <section id="idnavbar" className="navbar">
      <div className="div-titulo">
        <h1 className="titulo">StudyTrack</h1>
      </div>

      <nav>
        <Link to="/home"><img src={homeicon} className="icon" /> Início</Link>
        <Link to="/tarefas"><img src={taskicon} className="icon" /> Tarefas</Link>
        <Link to="/calendario"><img src={calendaricon} className="icon" /> Calendário</Link>
      </nav>

      <div className="perfil-usuario">
        <div className="user-info-wrapper">
          <div className="avatar">{inicial}</div>
          <div className="info-usuario">
            <div className="nome">{user?.displayName || "Usuário"}</div>
            <div className="email">{user?.email || ""}</div>
          </div>
        </div>

        <div className="acoes-usuario">
          <button onClick={logout} className="botao-perfil botao-logout">
            <img src={logouticon} className="icon-small" />
            Sair da conta
          </button>
        </div>
      </div>
    </section>
  )
}

export default Navbar