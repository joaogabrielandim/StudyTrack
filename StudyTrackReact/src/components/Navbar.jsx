import "./Navbar.css"
import homeicon from "../assets/homeicon.svg"
import taskicon from "../assets/taskicon.svg"
import calendaricon from "../assets/calendaricon.svg"
import settingsicon from "../assets/settings.svg"
import logouticon from "../assets/user-logout.svg"
import { Link } from "react-router-dom"
import { useAuth } from "react-auth-verification-context"

function Navbar() {

  const {logout} = useAuth();

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
          <div className="avatar">J</div>
          <div className="info-usuario">
            <div className="nome">João Gadelha</div>
            <div className="email">joaogadelha@gmail.com</div>
          </div>
        </div>

        <div className="acoes-usuario">
          <button className="botao-perfil">
            <img src={settingsicon} className="icon-small" /> 
            Configurações
          </button>
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