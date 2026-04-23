import "./Navbar.css"
import homeicon from "../assets/homeicon.svg"
import taskicon from "../assets/taskicon.svg"
import calendaricon from "../assets/calendaricon.svg"
import {Link} from "react-router-dom"


function Navbar() {
    return(
        <section id="idnavbar" className="navbar">
            <div className="div-titulo">
                <h1 className="titulo">StudyTrack</h1>
            </div>
            <nav>
                <Link to="/home" > <img src={homeicon} className="icon"></img> Início</Link>
                <Link to="/tarefas" > <img src={taskicon} className="icon"></img> Tarefas</Link>
                <Link to="/calendario" > <img src={calendaricon} className="icon"></img> Calendário</Link>
            </nav>
            <div className="perfil-usuario">
            <div className="avatar">JG</div>
            <div className="info-usuario">
            <div className="nome">João Gadelha</div>
            <div className="email">joaogadelha@gmail.com</div>
          </div>
        </div>
        </section>
    )
}

export default Navbar