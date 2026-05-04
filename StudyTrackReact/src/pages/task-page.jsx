import { useState } from "react";
import "./task-page.css";
import Navbar from "../components/Navbar";
import Modal2 from "./scroolview2"; 

function Task() {
    const [isOpen2, setIsOpen2] = useState(false);

    return (
        <div className="principal-task">
            <Navbar />

            <main className="conteudo-principal-task">
                <div className="cabecalho-task">
                    <div className="cabecalho-topo">
                        <h1>Tarefas</h1>
                        <button
                            className="botao-nova-tarefa"
                            onClick={() => setIsOpen2(true)}
                        >
                            Nova Tarefa
                        </button>
                    </div>
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
            <Modal2
                isOpen2={isOpen2}
                onClose2={() => setIsOpen2(false)}  
            />
        </div>
    );
}

export default Task;