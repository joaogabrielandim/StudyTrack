import "./task-page.css"
import Navbar from "../components/Navbar"


function Task() {
    return(
        <div className="principal">
        
            <Navbar/>
    
        <div className="conteudo-principal">
            <div className="cabecalho">
            <div>
                <h1>Tarefas</h1>
                <p>Gerencie suas atividades de curso!</p>
            </div>
            </div>
            <div className="box">
            <div className="boxprogresso"></div>
            <div className="boxhoras"></div>
            <div className="boxlista"></div>
            <div className="boxsessoes"></div>
            <div className="boxconcluidas"></div>
            <div className="boxsequencia"></div>
            <div className="boxdistribuicao"></div>
            <div className="horasdeestudo"></div>
            <div className="graficos"></div>
            </div>
        </div>
        </div>
    )
}

export default Task;