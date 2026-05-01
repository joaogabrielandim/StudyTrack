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
                            <div className="divInterna1-task">
                                /* Aqui você pode adicionar os cards de tarefas*/
                            </div>
                        </div>
                        
                        <div className="boxhoras-task">
                            <div className="divInterna2-task">
                                /* tarefas feitas*/
                            </div>
                        </div>
                    </div>

                
                    <div className="TarefasPorFazer-task">
                        <div className="divInterna3-task">
                            Calendário
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Task;