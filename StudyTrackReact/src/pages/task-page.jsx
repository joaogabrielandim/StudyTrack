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
            <Modal2
                isOpen2={isOpen2}
                onClose2={() => setIsOpen2(false)}  
            />
        </div>
    );
}

export default Task;