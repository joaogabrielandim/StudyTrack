import "./task-page.css"
import Navbar from "../components/Navbar"

function Task() {
    return (
        <div className="principal-task">
            <Navbar />
            
            <main className="conteudo-principal-task">
                <div className="cabecalho-task">
                    <h1>Tarefas</h1>
                    <p>Gerencie suas atividades de curso!</p>
                </div>

                <div className="box-task">
             
                    <div className="coluna-cards-task">
                        <div className="boxprogresso-task">
                            <h3>Suas tarefas</h3>
                            <p>[Colocar tarefas aqui]</p>
                        </div>
                        
                        <div className="boxhoras-task">
                            <h3>Seus eventos</h3>
                            <p>[Colocar eventos aqui]</p>
                        </div>
                    </div>

                
                    <div className="horasdeestudo-task">
                        <div className="placeholder-calendario-task">
                            Calendário
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Task;