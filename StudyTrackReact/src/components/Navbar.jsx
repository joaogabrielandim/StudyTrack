import "./Navbar.css"
import homeicon from "../assets/homeicon.svg"
import taskicon from "../assets/taskicon.svg"
import calendaricon from "../assets/calendaricon.svg"

function Navbar() {
    return(
        <section id="idnavbar" className="navbar">
            <div className="div-titulo">
                <h1 className="titulo">StudyTrack</h1>
            </div>
            <nav>
                <a href="../pages/task.html"> <img src={homeicon} className="icon"></img> Início</a>
                <a href="#"> <img src={taskicon} className="icon"></img> Tarefas</a>
                <a href="../pages/planner.html"> <img src={calendaricon} className="icon"></img> Calendário</a>
            </nav>
        </section>
    )
}

export default Navbar