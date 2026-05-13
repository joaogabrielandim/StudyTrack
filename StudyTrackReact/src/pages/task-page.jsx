import { useState } from "react";
import "./task-page.css";
import Navbar from "../components/Navbar";
import Modal2 from "./scroolview2"; 

function Task() {
  const [isOpen2, setIsOpen2] = useState(false);
  const [tarefas, setTarefas] = useState([]);

  // Lógica da Barra de Progresso
  const totalTarefas = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;
  const porcentagem = totalTarefas > 0 ? Math.round((concluidas / totalTarefas) * 100) : 0;

  const adicionarTarefa = (novaTarefa) => {
    setTarefas([...tarefas, { ...novaTarefa, concluida: false }]);
  };

  const alternarConclusao = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].concluida = !novasTarefas[index].concluida;
    setTarefas(novasTarefas);
  };

  const deletarTarefa = (index) => {
    const novasTarefas = tarefas.filter((_, i) => i !== index);
    setTarefas(novasTarefas);
  };

  return (
    <div className="principal-task">
      <Navbar />
      <main className="conteudo-principal-task">
        <div className="cabecalho-task">
          <div className="cabecalho-topo">
            <h1>Tarefas</h1>
            <button className="botao-nova-tarefa" onClick={() => setIsOpen2(true)}>
              Nova Tarefa
            </button>
          </div>
          <p>Gerencie suas atividades de curso!</p>
        </div>

        <div className="box-task">
          <div className="coluna-cards-task">
            
            {/* CARD DE PROGRESSO */}
            <div className="boxprogresso-task">
              <div className="divInterna1-task">
                <div className="progresso-header">
                  <span className="progresso-titulo">Progresso Geral</span>
                  <span className="progresso-contagem">{concluidas}/{totalTarefas} concluídas</span>
                </div>
                
                <div className="barra-progresso-container">
                  <div 
                    className="barra-progresso-fill" 
                    style={{ width: `${porcentagem}%` }}
                  ></div>
                </div>
                
                <span className="progresso-porcentagem-texto">
                  {porcentagem}% das tarefas concluídas
                </span>
              </div>
            </div>

            {/* LISTA DE TAREFAS */}
            <div className="boxhoras-task">
              <div className="divInterna2-task">
                <h3 className="titulo-secao-tarefas">Minhas Tarefas</h3>
                
                <div className="checklist-container">
                  {tarefas.length === 0 ? (
                    <div className="empty-state">
                      <p>Nenhuma tarefa adicionada.</p>
                    </div>
                  ) : (
                    tarefas.map((item, index) => (
                      <div key={index} className="card-tarefa-item">
                        <div className="lado-esquerdo-card">
                          <input 
                            type="checkbox" 
                            className="checkbox-tarefa" 
                            checked={item.concluida}
                            onChange={() => alternarConclusao(index)}
                          />
                          <div className="info-tarefa">
                            <span className={`titulo-tarefa ${item.concluida ? 'texto-riscado' : ''}`}>
                              {item.titulo}
                            </span>
                            <span className="detalhes-tarefa">
                              {item.materia} • <span className={`prioridade-${item.prioridade.toLowerCase()}`}>{item.prioridade}</span>
                            </span>
                          </div>
                        </div>
                        <button onClick={() => deletarTarefa(index)} className="btn-deletar-tarefa">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>
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
        onAdicionar={adicionarTarefa} 
      />
    </div>
  );
}

export default Task;