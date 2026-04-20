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
                <Link to="/" > <img src={homeicon} className="icon"></img> Início</Link>
                <Link to="/tarefas" > <img src={taskicon} className="icon"></img> Tarefas</Link>
                <Link to="/calendario" > <img src={calendaricon} className="icon"></img> Calendário</Link>
            </nav>
            <div class="perfil-usuario">
            <div class="avatar">JG</div>
            <div class="info-usuario">
            <div class="nome">João Gadelha</div>
            <div class="email">joaogadelha@gmail.com</div>
          </div>
        </div>
        </section>
    )
}

export default Navbar